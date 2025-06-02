"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { fetchExchangeRates } from "@/lib/fetchExchangeRates";

interface CurrencyContextProps {
  fromCurrency: string;
  toCurrency: string;
  amount: string; // string to allow manual input
  result: number;
  setFromCurrency: (value: string) => void;
  setToCurrency: (value: string) => void;
  setAmount: (value: string) => void;
}

const CurrencyContext = createContext<CurrencyContextProps | null>(null);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("IRR");
  const [amount, setAmount] = useState("1");
  const [result, setResult] = useState(0);
  const [rates, setRates] = useState<Record<string, number>>({});

  // Clean input: allow only digits and dot (for decimal)
  const cleanAmount = (value: string) => value.replace(/[^0-9.]/g, "");

  useEffect(() => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setResult(0);
      return;
    }
    if (fromCurrency === toCurrency) {
      setResult(Number(amount));
    } else {
      const rate = rates[toCurrency] || 1;
      setResult(Number(amount) * rate);
    }
  }, [amount, toCurrency, fromCurrency, rates]);

  useEffect(() => {
    const getRates = async () => {
      try {
        const data = await fetchExchangeRates(fromCurrency);
        setRates(data);
      } catch (error) {
        console.error("Failed to fetch rates:", error);
      }
    };
    getRates();
  }, [fromCurrency]);

  return (
    <CurrencyContext.Provider
      value={{
        fromCurrency,
        toCurrency,
        amount,
        result,
        setFromCurrency,
        setToCurrency,
        setAmount: (val) => setAmount(cleanAmount(val)),
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context)
    throw new Error("useCurrency must be used within CurrencyProvider");
  return context;
};
