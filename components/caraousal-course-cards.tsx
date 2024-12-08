"use client";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRef } from "react";

const CaraousalCourseCard = () => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));

  return (
    <Card
      id="module"
      className="w-full bg-transparent shadow-none border-none mt-6"
    >
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        opts={{
          align: 'start',
          loop: true,
        }}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CardHeader className="px-0 w-full flex flex-col tablet:flex-row justify-between items-start gap-2">
          <CardTitle className="text-2xl">Course Modules</CardTitle>
          {/* <CardDescription className="flex flex-col tablet:flex-row justify-between items-start gap-2">
            <span className="max-w-[700px]">
              Our Tabla course is structured into progressive modules, each
              designed to guide you step by step from foundational skills to
              advanced mastery.
            </span>
            <Button variant="secondary">View All</Button>
          </CardDescription> */}
          <div className="flex justify-end items-end gap-4">
            <CarouselPrevious className="relative -left-1/2 bg-white" />
            <CarouselNext className="relative -left-1/2 bg-white" />
          </div>
        </CardHeader>
        <CarouselContent className="w-full">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="w-full">
              <Content />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </Card>
  );
};

export default CaraousalCourseCard;

const Content = () => {
  return (
    <CardContent className="px-0">
      <div className="grid grid-cols-1 gap-10 sm:gap-6 md:gap-10 desktop:gap-x-10 desktop:gap-y-10">
        <div className="flex flex-col lg:flex-row justify-start items-start lg:items-center gap-4 bg-primary p-4 rounded-lg shadow-sm">
          <Card className="h-full bg-transparent border-none shadow-none w-full py-0">
            <CardHeader className="flex justify-center items-center">
              <Image
                src="/course-thumbnail.png"
                alt="arrow"
                width={0}
                height={0}
                className="z-10 w-full bg-primary p-10 py-16 sm:p-12 md:p-20 desktop:px-32 rounded-sm border border-muted/20"
              />
            </CardHeader>
            <CardContent className="py-0 text-white">
              <div className="w-full flex flex-col sm:flex-col lg:flex-row justify-between items-start sm:items-start lg:items-center gap-4">
                <div className="flex justify-start items-center gap-2">
                  <Badge
                    variant="outline"
                    className="py-2 px-4 bg-white text-primary"
                  >
                    1 Year
                  </Badge>
                  <Badge
                    variant="outline"
                    className="py-2 px-4 bg-white text-primary"
                  >
                    Beginner
                  </Badge>
                </div>
                <span className="text-sm tablet:text-base desktop:text-lg">
                  By Pandit Abhijit Banerjee
                </span>
              </div>
              <CardHeader className="px-0">
                <CardTitle className="text-xl">Prathama (1st Year)</CardTitle>
              </CardHeader>
            </CardContent>
            <CardFooter>
              <Link href="/profile" className="w-full">
                <Button variant="secondary" className="w-full">
                  Get it Now
                </Button>
              </Link>
            </CardFooter>
          </Card>
          <div className="w-full h-full flex flex-col justify-start items-start text-white gap-2 px-4 lg:pl-0 py-4">
            <h1 className="text-3xl font-semibold">About the Course</h1>
            <ul className="list-disc list-inside text-sm">
              <span className="text-base font-medium">Course Description</span>
              <li className="pl-4">
                Introduction to Tabla: Overview of its history, significance in
                Indian classical music, and cultural importance.
              </li>
              <li className="pl-4">
                Anatomy of the Tabla: Detailed exploration of the components,
                materials, and tuning methods for both Dayan (right-hand drum)
                and Bayan (left-hand drum).
              </li>
              <li className="pl-4">
                Basic Hand Techniques: Step-by-step guidance on fundamental
                strokes, including Ta, Tin, Tun, and Ghe.
              </li>
              <li className="pl-4">
                Simple Thekas: Introduction to basic rhythmic cycles such as
                Teen Taal and Keherwa.
              </li>
              <li className="pl-4">
                Practice Drills: Structured exercises to build hand
                coordination, strength, and precision.
              </li>
              <li className="pl-4">
                Tuning Essentials: Methods to achieve perfect pitch and tonal
                clarity for your Tabla set.
              </li>
              <li className="pl-4">
                Cultural Insights: Understanding the role of Tabla in different
                genres, including classical, semi-classical, and folk music.
              </li>
              <span className="text-base font-medium">Learning Outcomes </span>
              <br></br>
              <span className="text-base font-medium">
                By the end of Module 1, learners will:
              </span>
              <li className="pl-4">
                Be familiar with the basic structure and care of Tabla.
              </li>
              <li className="pl-4">Master fundamental strokes and rhythms.</li>
            </ul>
          </div>
        </div>
      </div>
    </CardContent>
  );
};
