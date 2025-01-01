"use client";

import { Label } from "@radix-ui/react-label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "./ui/card";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { pricing } from "@/data/constants/pricing-checkout";

type propsType = {
  id: number;
  name: string;
  lengthInYears: number;
};


const BuyingOptionsNew = ({ course }: { course: propsType }) => {

  const [country, setCountry] = useState<string>("DEFAULT");

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch("/api/location");
        const data = await response.json();
        setCountry(data.country);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };
    fetchLocation();
  }, []);
  const handleCheckout = async(courseName: string, module: string, amount: number) => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseName: courseName,
          amount: amount,
          metadata: {
            course: courseName,
            year: module
          }
        }),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        console.error('Error creating checkout session:', data.error);
      }
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

   const coursePricing = pricing.find((c) => c.courseName === course.name);

   if(!coursePricing) {
    <div>No pricing available for this course</div>
   }


  return (
    <div className="w-full flex flex-col justify-start items-start gap-6">
      <Label>Choose Options</Label>
      <Card
        className="w-full bg-transparent shadow-none border-none mt-6"
      >
        <CardContent className="px-0">
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center gap-x-4 gap-y-6">
            {coursePricing?.priceModule.map((priceModel, index) => {
              return (
                <Card
                  key={index}
                  className="w-full pb-0 flex flex-col justify-between rounded-sm bg-primary text-white shadow-none border border-muted/20"
                >
                  <div>
                    <CardHeader className="min-h-36 flex justify-start items-center gap-4">
                      <Button className="bg-primary w-full rounded-sm cursor-default shadow-none ">
                        {priceModel.plan}
                      </Button>
                      <span className="drop-shadow-3xl">
                        <span className="text-4xl font-semibold">
                          {country === "IN"
                            ? priceModel.priceIn
                            : `${priceModel.priceDefault}`}
                        </span>
                      </span>
                    </CardHeader>
                  </div>
                  <CardFooter>
                    <Link href="/buy-course" className="w-full">
                      <Button onClick={() => handleCheckout(course.name, priceModel.plan, priceModel.amount)} className="w-full bg-white text-primary hover:bg-muted">
                        Get it Now
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuyingOptionsNew;
