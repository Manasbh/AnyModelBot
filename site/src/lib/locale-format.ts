/** Formatting never changes the currency or the numeric value used in calculations. */
const currencyFormats = new Map<string, Intl.NumberFormat>();
export function formatUSD(value: number, locale = "en-US", minimumFractionDigits = 0, maximumFractionDigits = 6, useGrouping = false): string {
  const key = `${locale}:${minimumFractionDigits}:${maximumFractionDigits}:${useGrouping}`;
  let formatter = currencyFormats.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, { style: "currency", currency: "USD", currencyDisplay: "narrowSymbol", minimumFractionDigits, maximumFractionDigits, useGrouping });
    currencyFormats.set(key, formatter);
  }
  return formatter.format(value);
}

/** Snapshots store an English display value; localize it without editing the snapshot. */
export function localizeSnapshotUSD(text: string, locale: string): string {
  const match = /^(< )?\$([\d,]+(?:\.\d+)?)$/.exec(text);
  if (!match) return text;
  const decimals = match[2].split(".")[1]?.length ?? 0;
  return `${match[1] || ""}${formatUSD(Number(match[2].replaceAll(",", "")), locale, decimals, decimals, true)}`;
}
