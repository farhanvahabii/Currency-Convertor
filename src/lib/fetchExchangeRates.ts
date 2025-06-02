export interface RatesResponse {
  base_code: string;
  conversion_rates: Record<string, number>;
}

export async function fetchExchangeRates(
  base: string
): Promise<Record<string, number>> {
  const API_KEY = process.env.NEXT_PUBLIC_EXCHANGE_API_KEY;
  const res = await fetch(
    `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${base}`
  );

  if (!res.ok) {
    throw new Error("خطا در دریافت نرخ‌های تبدیل");
  }

  const data: RatesResponse = await res.json();
  return data.conversion_rates;
}
