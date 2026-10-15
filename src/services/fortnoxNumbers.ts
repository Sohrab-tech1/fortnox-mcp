/**
 * Numeric fields returned by Fortnox may be JSON numbers or numeric strings,
 * depending on the resource. Supplier invoice amounts are one such case.
 */
export type FortnoxNumber = number | string | null;

/**
 * Parse a Fortnox numeric value without accepting arbitrary JavaScript number
 * syntax. Invalid or non-finite values are left undefined instead of silently
 * becoming a misleading amount.
 */
export function parseFortnoxNumber(value: FortnoxNumber | undefined): number | undefined {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : undefined;
  }
  if (typeof value !== "string") {
    return undefined;
  }

  const normalized = value.trim();
  if (!/^-?\d+(?:\.\d+)?$/.test(normalized)) {
    return undefined;
  }

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : undefined;
}

/** Preserve the existing tool behaviour of treating a missing amount as zero. */
export function fortnoxNumberOrZero(value: FortnoxNumber | undefined): number {
  return parseFortnoxNumber(value) ?? 0;
}
