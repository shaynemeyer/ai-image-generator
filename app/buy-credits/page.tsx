"use client";
import React from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { renderError } from "@/lib/errors";
import { toast } from "@/hooks/use-toast";
import { saveCreditToDb } from "@/actions/credit";
import Loader from "@/components/Loader";
import { useImage } from "@/context/Image";

function BuyCreditsPage() {
  const [{ isPending }] = usePayPalScriptReducer();
  const [selectedOption, setSelectedOption] = React.useState({
    credits: 10,
    price: 5,
  });
  const { credits } = useImage();

  const creditOptions = [
    { credits: 10, price: 5 },
    { credits: 20, price: 10 },
    { credits: 50, price: 20 },
  ];

  // TODO: figure out this type, replace any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSuccess = async (details: any) => {
    // console.log("Payment success!", details);
    const amount = parseFloat(details.purchase_units[0].amount.value);
    const credits = parseInt(details.purchase_units[0].custom_id, 10);

    try {
      await saveCreditToDb(amount, credits);
      toast({
        description: "Credits purchased successfully",
        variant: "default",
      });
    } catch (error) {
      renderError(error);
      toast({
        description: "Failed to buy credits",
        variant: "destructive",
      });
    }
  };

  const handleError = (error: Record<string, unknown>) => {
    console.log("Error: ", error);
  };

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Buy Credits
          </CardTitle>
          <p className="text-center">
            You currently have{" "}
            <span className="font-bold text-primary">{credits}</span> credits
          </p>
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
