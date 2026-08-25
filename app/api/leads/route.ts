import { SERVICES as PACKAGES } from "@/lib/services";
import { getKommoConfig, sendKommo } from "@/lib/kommo";

// service value → human label for the notification
const SERVICE_LABELS: Record<string, string> = {
  ...Object.fromEntries(PACKAGES.map((s) => [s.prefill, s.name])),
  inne: "Konsultacja / nie wiem",
};
const VALID_SERVICES = new Set(Object.keys(SERVICE_LABELS));

type LeadBody = {
  name?: unknown;
  phone?: unknown;
  service?: unknown;
  details?: unknown;
  website?: unknown;
};

function text(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function validPhone(value: string): boolean {
  if (!/^\+?[\d\s().-]+$/.test(value)) return false;
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

// Telegram HTML-parse-mode escaping for user-supplied content
function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

type Lead = {
  name: string;
  phone: string;
  service: string;
  details: string;
};

async function sendTelegram(
  token: string,
  chatId: string,
  lead: Lead,
): Promise<void> {
  const label = lead.service ? SERVICE_LABELS[lead.service] : null;
  const message = [
    "🚗 <b>Nowe zgłoszenie</b> — primero.studio",
    "",
    `👤 <b>Imię:</b> ${esc(lead.name)}`,
    `📞 <b>Telefon:</b> ${esc(lead.phone)}`,
    label ? `🧴 <b>Usługa:</b> ${esc(label)}` : null,
    lead.details ? `📝 <b>Uwagi:</b>\n${esc(lead.details)}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(8_000),
    },
  );

  if (!response.ok) {
    const info = await response.text().catch(() => "");
    throw new Error(`telegram:${response.status}:${info.slice(0, 200)}`);
  }
}

async function sendWebhook(webhook: string, lead: Lead): Promise<void> {
  const url = new URL(webhook);
  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("webhook:bad-protocol");
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(process.env.LEAD_WEBHOOK_TOKEN
        ? { authorization: `Bearer ${process.env.LEAD_WEBHOOK_TOKEN}` }
        : {}),
    },
    body: JSON.stringify({
      event: "lead.created",
      lead: {
        name: lead.name,
        phone: lead.phone,
        service: lead.service || null,
        details: lead.details || null,
      },
      source: "primero.studio",
      createdAt: new Date().toISOString(),
    }),
    signal: AbortSignal.timeout(8_000),
  });

  if (!response.ok) throw new Error(`webhook:${response.status}`);
}

export async function POST(request: Request) {
  let body: LeadBody;

  try {
    body = (await request.json()) as LeadBody;
  } catch {
    return Response.json(
      { error: "Nieprawidłowe dane formularza." },
      { status: 400 },
    );
  }

  // Honeypot: silently accept bot submissions without forwarding them.
  if (text(body.website, 200)) {
    return Response.json({ ok: true });
  }

  const name = text(body.name, 80);
  const phone = text(body.phone, 30);
  const service = text(body.service, 30);
  const details = text(body.details, 1000);

  if (name.length < 2 || !validPhone(phone)) {
    return Response.json(
      { error: "Podaj imię i poprawny numer telefonu." },
      { status: 400 },
    );
  }

  if (service && !VALID_SERVICES.has(service)) {
    return Response.json({ error: "Nieprawidłowa usługa." }, { status: 400 });
  }

  const lead: Lead = { name, phone, service, details };

  const tgToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const tgChat = process.env.TELEGRAM_CHAT_ID?.trim();
  const webhook = process.env.LEAD_WEBHOOK_URL?.trim();

  const deliveries: { channel: string; run: Promise<void> }[] = [];
  if (tgToken && tgChat) {
    deliveries.push({ channel: "telegram", run: sendTelegram(tgToken, tgChat, lead) });
  }
  if (webhook) {
    deliveries.push({ channel: "webhook", run: sendWebhook(webhook, lead) });
  }

  const kommo = getKommoConfig();
  if (kommo) {
    deliveries.push({
      channel: "kommo",
      run: sendKommo(kommo, {
        name,
        phone,
        serviceLabel: service ? (SERVICE_LABELS[service] ?? null) : null,
        details,
      }),
    });
  }

  // Nothing configured → tell the client to use the WhatsApp/Instagram fallback.
  if (deliveries.length === 0) {
    return Response.json(
      {
        error:
          "Formularz jest chwilowo niedostępny. Skontaktuj się z nami przez Instagram.",
      },
      { status: 503 },
    );
  }

  const results = await Promise.allSettled(deliveries.map((d) => d.run));
  results.forEach((r, i) => {
    if (r.status === "rejected") {
      console.error(`Lead delivery failed [${deliveries[i].channel}]`, r.reason);
    }
  });

  // Success if at least one channel accepted the lead.
  const delivered = results.some((r) => r.status === "fulfilled");
  if (!delivered) {
    return Response.json(
      { error: "Nie udało się wysłać zgłoszenia. Spróbuj ponownie za chwilę." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
