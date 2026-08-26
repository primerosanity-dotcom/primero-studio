// Kommo CRM lead delivery. Enabled by env vars; absent config = channel off.

export type KommoConfig = {
  subdomain: string;
  token: string;
  pipelineId?: number;
  statusId?: number;
  responsibleUserId?: number;
};

export type KommoLead = {
  name: string;
  phone: string;
  serviceLabel: string | null;
  details: string;
};

function positiveInt(value: string | undefined): number | undefined {
  const parsed = Number(value?.trim());
  return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined;
}

export function getKommoConfig(): KommoConfig | null {
  const rawSubdomain = process.env.KOMMO_SUBDOMAIN?.trim();
  const token = process.env.KOMMO_ACCESS_TOKEN?.trim();
  if (!rawSubdomain || !token) return null;

  // Accept "acme", "acme.kommo.com" or a full URL — keep only the account name.
  const subdomain = rawSubdomain
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "")
    .replace(/\.kommo\.com$/i, "");
  if (!/^[a-z0-9][a-z0-9-]*$/i.test(subdomain)) return null;

  return {
    subdomain,
    token,
    pipelineId: positiveInt(process.env.KOMMO_PIPELINE_ID),
    statusId: positiveInt(process.env.KOMMO_STATUS_ID),
    responsibleUserId: positiveInt(process.env.KOMMO_RESPONSIBLE_USER_ID),
  };
}

async function kommoPost(
  config: KommoConfig,
  path: string,
  body: unknown,
): Promise<unknown> {
  const response = await fetch(
    `https://${config.subdomain}.kommo.com/api/v4${path}`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${config.token}`,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(8_000),
    },
  );

  if (!response.ok) {
    const info = await response.text().catch(() => "");
    throw new Error(`kommo:${response.status}:${info.slice(0, 200)}`);
  }

  return response.json().catch(() => null);
}

/**
 * Creates the deal and its contact in one call, then attaches the free-text
 * details as a note. Kommo's complex endpoint links to an existing contact
 * when the phone number already exists, so repeat clients stay a single card.
 */
export async function sendKommo(
  config: KommoConfig,
  lead: KommoLead,
): Promise<void> {
  // Kommo's "INFO" textarea on the deal — the field the studio actually reads.
  const info = [
    lead.serviceLabel ? `Usługa: ${lead.serviceLabel}` : null,
    lead.details ? `Uwagi: ${lead.details}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const deal = {
    name: lead.serviceLabel
      ? `Strona WWW — ${lead.serviceLabel}`
      : "Strona WWW — zapytanie",
    ...(info
      ? {
          custom_fields_values: [
            { field_code: "INFO", values: [{ value: info }] },
          ],
        }
      : {}),
    ...(config.pipelineId ? { pipeline_id: config.pipelineId } : {}),
    ...(config.statusId ? { status_id: config.statusId } : {}),
    ...(config.responsibleUserId
      ? { responsible_user_id: config.responsibleUserId }
      : {}),
    _embedded: {
      contacts: [
        {
          name: lead.name,
          ...(config.responsibleUserId
            ? { responsible_user_id: config.responsibleUserId }
            : {}),
          custom_fields_values: [
            {
              field_code: "PHONE",
              values: [{ value: lead.phone, enum_code: "MOB" }],
            },
          ],
        },
      ],
    },
  };

  const created = await kommoPost(config, "/leads/complex", [deal]);
  const leadId = Array.isArray(created) ? created[0]?.id : undefined;
  if (typeof leadId !== "number") return;

  const note = [
    "Zgłoszenie ze strony primero-studio.com",
    `Imię: ${lead.name}`,
    `Telefon: ${lead.phone}`,
    lead.serviceLabel ? `Usługa: ${lead.serviceLabel}` : null,
    lead.details ? `Uwagi: ${lead.details}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  // The deal is already in the CRM — a failed note must not fail the delivery.
  try {
    await kommoPost(config, `/leads/${leadId}/notes`, [
      { note_type: "common", params: { text: note } },
    ]);
  } catch (error) {
    console.error("Kommo note failed", error);
  }
}
