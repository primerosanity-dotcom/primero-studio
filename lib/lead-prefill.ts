export const LEAD_PREFILL_EVENT = "primero:lead-prefill";

export type LeadPrefill = {
  service?: string;
  details?: string;
};

export function dispatchLeadPrefill(detail: LeadPrefill): void {
  window.dispatchEvent(
    new CustomEvent<LeadPrefill>(LEAD_PREFILL_EVENT, { detail }),
  );
}
