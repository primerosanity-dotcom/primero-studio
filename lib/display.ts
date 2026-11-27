import { COMPANY } from "@/lib/site-config";

type HoursRow = { days: string; hours: string };

/**
 * Opening hours for display: when every day has the same hours they collapse
 * into one row ("Pon – Nd: 10:00 – 17:00") instead of three identical ones.
 */
export function displayHours(rows: HoursRow[]): HoursRow[] {
  if (rows.length > 1 && rows.every((r) => r.hours === rows[0].hours)) {
    return [{ days: "Pon – Nd", hours: rows[0].hours }];
  }
  return rows;
}

/**
 * Street and city on one line: "ul. Papiernicza 7R, 92-312 Łódź". The postal
 * code is added to the city line when it isn't there yet, so the address reads
 * exactly like the Google Business Profile (NAP consistency).
 */
export function addressLine(lines: string[]): string {
  const parts = lines.map((l) => l.trim()).filter(Boolean);
  const zip = COMPANY.postalCode;
  if (zip && parts.length > 1 && !/\d{2}-\d{3}/.test(parts.join(" "))) {
    parts[parts.length - 1] = `${zip} ${parts[parts.length - 1]}`;
  }
  return parts.join(", ");
}
