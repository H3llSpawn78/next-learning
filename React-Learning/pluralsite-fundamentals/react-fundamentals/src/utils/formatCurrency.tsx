type CurrencyFormatOptions = {
  currency?: string;
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

export function formatCurrency(
  amount: number,
  {
    currency = "GBP",
    locale = "en-GB",
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
  }: CurrencyFormatOptions = {},
) {
  if (typeof amount !== "number") return "";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount);
}
