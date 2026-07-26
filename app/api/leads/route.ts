const SERVICES = new Set([
  "essential",
  "protect",
  "restore",
  "ceramic",
  "signature",
  "inne",
]);

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

  if (service && !SERVICES.has(service)) {
    return Response.json({ error: "Nieprawidłowa usługa." }, { status: 400 });
  }

  const webhook = process.env.LEAD_WEBHOOK_URL?.trim();
  if (!webhook) {
    return Response.json(
      {
        error:
          "Formularz jest chwilowo niedostępny. Skontaktuj się z nami przez Instagram.",
      },
      { status: 503 },
    );
  }

  try {
    const url = new URL(webhook);
    if (!["http:", "https:"].includes(url.protocol)) {
      throw new Error("protocol");
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
        lead: { name, phone, service: service || null, details: details || null },
        source: "primero.studio",
        createdAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(8_000),
    });

    if (!response.ok) throw new Error(`webhook:${response.status}`);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Lead webhook failed", error);
    return Response.json(
      { error: "Nie udało się wysłać zgłoszenia. Spróbuj ponownie za chwilę." },
      { status: 502 },
    );
  }
}
