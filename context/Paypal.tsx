"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from "react";

const initialOptions = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
  currency: "USD",
  locale: "en_US",
  intent: "capture",
};

export default function PaypalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PayPalScriptProvider options={initialOptions}>
      {children}
    </PayPalScriptProvider>
  );
}
