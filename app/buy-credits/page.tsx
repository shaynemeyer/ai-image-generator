"use client";
import React from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function BuyCreditsPage() {
  const [{ isPending }] = usePayPalScriptReducer();
  const [selectedOption, setSelectedOption] = React.useState({
    credits: 10,
    price: 5,
  });

  const creditOptions = [
    { credits: 10, price: 5 },
    { credits: 20, price: 10 },
    { credits: 50, price: 20 },
  ];

  if (isPending) {
    return <div className="text-4xl">Loading...</div>;
  }
  // TODO: figure out this type, replace any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSuccess = (details: any) => {
    console.log("Payment success!", details);
  };

  const handleError = (error: Record<string, unknown>) => {
    console.log("Error: ", error);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Buy Credits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 justify-between mb-6">
            {creditOptions.map((option) => (
              <>
                <Button
                  key={option.credits}
                  onClick={() => setSelectedOption(option)}
                  variant={
                    selectedOption.credits === option.credits
                      ? "default"
                      : "outline"
                  }
                  className="h-10"
                >
                  {option.credits} Credits - ${option.price}
                </Button>
              </>
            ))}
          </div>
          <div className="relative z-0">
            <PayPalButtons
              key={selectedOption.credits}
              // TODO: figure out this type, replace any
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              createOrder={(data, actions: any) => {
                const price = selectedOption.price.toFixed(2);
                const credits = selectedOption.credits.toString();

                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        currency_code: "USD",
                        value: price,
                      },
                      custom_id: credits,
                    },
                  ],
                });
              }}
              // TODO: figure out this type, replace any
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onApprove={async (data, actions: any) => {
                const details = await actions.order.capture();
                handleSuccess(details);
              }}
              onError={handleError}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
export default BuyCreditsPage;
