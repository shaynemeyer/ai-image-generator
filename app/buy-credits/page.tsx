"use client";
import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function BuyCreditsPage() {
  const [selectedOption, setSelectedOption] = React.useState({
    credits: 10,
    price: 5,
  });

  const creditOptions = [
    { credits: 10, price: 5 },
    { credits: 20, price: 10 },
    { credits: 50, price: 20 },
  ];

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
        </CardContent>
      </Card>
    </div>
  );
}
export default BuyCreditsPage;
