"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useEffect, useState } from "react";

const PricingNew = () => {
  const [country, setCountry] = useState<string>("DEFAULT");

  useEffect(() => {
    // const fetchLocation = async () => {
    //   const location = await getUserLocation();
    //   setCountry(location.country);

    // };

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

  return (
    <Card className="w-full bg-transparent shadow-none border-none mt-6">
      <CardHeader className="px-0">
        <CardTitle className="text-2xl">Pricing Model</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-x-4 gap-y-6">
          {pricingModel.map((priceModel, index) => {
            return(
            <Card key={index} className="w-full pb-0 flex flex-col justify-between rounded-sm bg-primary text-white shadow-none border border-muted/20">
              <div>
                <CardHeader className="min-h-36 flex justify-start items-center gap-4">
                  <Button className="bg-background w-full rounded-sm text-xs text-tertiary-foreground hover:bg-background cursor-default shadow-none ">
                    {priceModel.plan}
                  </Button>
                  <span className="drop-shadow-3xl">
                    <span className="text-5xl font-semibold">
                      {country === "IN" ? priceModel.priceIn : `${priceModel.priceDefault}`}
                    </span>
                  </span>
                </CardHeader>
                <CardContent className="pt-2 bg-primary text-white flex flex-col justify-center items-center gap-4">
                  <p>Available Features</p>
                  <div className="w-full flex flex-col justify-center items-center gap-2">
                    {priceModel.features.map((feature, idx) => {
                      return(
                        <span key={idx} className="w-full flex justify-start items-center gap-4 border border-muted/20 px-4 py-2 pointer-events-none cursor-default bg-transparent hover:bg-transparent shadow-none rounded-sm text-white text-sm">
                          <Image
                            src="/icons/tick.svg"
                            alt="tick"
                            width={0}
                            height={0}
                            className="w-6 p-1 bg-tertiary rounded-sm"
                          />
                          <span>{feature}</span>
                        </span>
                      )
                    })}
                  </div>
                </CardContent>
              </div>
              <CardFooter>
                <Button className="w-full bg-white text-primary hover:bg-muted">
                  Get Started
                </Button>
              </CardFooter>
            </Card>
            )
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingNew;


const pricingModel = [
  {
    plan: 'Module Wise',
    priceDefault: '$330',
    priceIn: '330',
    features: [
      'Access to a 3-month module containing 12 weekly lessons.',
      'Focused learning on a specific part of the curriculum.',
      'Designed for learners or those with specific goals.',
      'Flexible and concise, catering to busy schedules.',
      'A great introduction to the course\'s teaching style and content.',
      'Enabling probability to become an accredited teacher of Dhwani Academy.'
    ]
  },
  {
    plan: 'Month Wise',
    priceDefault: '$120',
    priceIn: '120',
    features: [
      'Gain access to 4 weekly lessons each month.',
      'Ideal for incremental progress with bite-sized learning.',
      'Encourages disciplined weekly practice.',
      'Affordable and easy to renew, suited for beginners.',
      'Allows exploration of classical music without long-term commitment.'
    ]
  },
  {
    plan: 'Year Wise',
    priceDefault: '$1200',
    priceIn: '1200',
    features: [
      'Includes 48 lessons spread across a structured year-long curriculum.',
      'Facilitates consistent learning for deeper understanding.',
      'Encourages learners to master techniques over time.',
      'Cost-effective for dedicated students seeking value.',
      'Comprehensive enough to cover significant progress in classical music.'
    ]
  },
  {
    plan: 'Full Course',
    priceDefault: 'Flexible',
    priceIn: 'Flexible',
    features: [
      'Complete access to all course lessons.',
      'Covers the entire curriculum from basics to advanced skills.',
      'Offers the best value for committed learners aiming for mastery.',
      'Flexible access throughout the duration to revisit lessons.',
      'Ideal for building a strong foundation and advanced expertise.',
      'Focussed to complete the whole session sooner to achieve the desired goal.'
    ]
  },
]