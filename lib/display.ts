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

/** Street and city on one line: "ul. Papiernicza 7R, Łódź". */
export function addressLine(lines: string[]): string {
  return lines.map((l) => l.trim()).filter(Boolean).join(", ");
}
