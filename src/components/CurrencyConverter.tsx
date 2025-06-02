"use client";

import { useCurrency } from "@/context/CurrencyContext";

const currencies = ["USD", "EUR", "GBP", "JPY", "CAD", "IRR"];

export default function CurrencyConverter() {
  const {
    fromCurrency,
    toCurrency,
    amount,
    result,
    setFromCurrency,
    setToCurrency,
    setAmount,
  } = useCurrency();

  return (
    <div className="w-1/2 h-1/2 mx-auto mt-16 p-8 rounded-2xl shadow-lg space-y-6 ">
      <h1 className="text-3xl font-bold text-center capitalize">
        Currency Converter
      </h1>

      <div>
        <label
          htmlFor="amount"
          className="block mb-2 font-medium text-gray-700 my-10"
        >
          Amount
        </label>
        <input
          id="amount"
          type="text"
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="from" className="block mb-2 font-medium text-gray-700">
          From
        </label>
        <select
          id="from"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {currencies.map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="to" className="block mb-2 font-medium text-gray-700">
          To
        </label>
        <select
          id="to"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {currencies.map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg text-center text-xl font-semibold text-gray-800">
        Result:{" "}
        {
          toCurrency === "IRR"
            ? Math.round(result * 10).toLocaleString() // ضرب در 10 برای بزرگ‌تر کردن عدد
            : result.toLocaleString(undefined, { maximumFractionDigits: 2 }) // دو رقم اعشار برای بقیه
        }{" "}
        {toCurrency}
      </div>
    </div>
  );
}
