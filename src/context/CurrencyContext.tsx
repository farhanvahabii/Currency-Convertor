"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type CurrencyContextType = {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  result: number;
  setFromCurrency: (value: string) => void;
  setToCurrency: (value: string) => void;
  setAmount: (value: number) => void;
  setResult: (value: number) => void;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(0);

    return (
    <CurrencyContext.Provider
      value={{
        fromCurrency,
        toCurrency,
        amount,
        result,
        setFromCurrency,
        setToCurrency,
        setAmount,
        setResult
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
