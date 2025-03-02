"use client";

import { notFound } from "next/navigation";
import { YearContent } from "@/components/year-content";
import { useFullProfileDetails } from "@/data/get-full-profile";
import { Skeleton } from "@/components/ui/skeleton";

export default function YearPage({ params }: { params: { yearId: string } }) {
  const { data: courseData, error, isPending } = useFullProfileDetails();

  // console.log(courseData)
  try {
    const yearId = parseInt(params.yearId);
    let yearData = null;
    if (isPending) {
      return (
        <div className="w-full min-h-screen">
          <section className="w-full h-full flex mt-8 relative scroll-smooth">
            <aside className="hidden w-[400px] min-h-[92vh] h-full tablet:flex flex-col justify-start items-start sticky top-8">
              <Skeleton className="min-h-[92vh] h-full max-w-[400px] w-full" />{" "}
              {/* Sidebar skeleton */}
            </aside>
            <div className="max-w-[1014px] w-full flex flex-col justify-start px-0 mx-auto tablet:max-w-full tablet:mx-0 tablet:pl-12">
              <Skeleton className="h-[500px] w-full" /> {/* Video skeleton */}
              <Skeleton className="h-10 w-3/4 mt-4" /> {/* Title skeleton */}
              <Skeleton className="h-4 w-1/2 mt-2" /> {/* Subtitle skeleton */}
              <Skeleton className="h-6 w-1/4 mt-4" /> {/* Button skeleton */}
            </div>
          </section>
        </div>
      );
    }

    if (error) {
      return (
        <div className="w-full min-h-screen flex justify-center items-center p-10" >
          <h1>No data found.</h1>
        </div>
      );
    }
    if (courseData.data) {
      for (const course of Object.values(courseData?.data)) {
        const year = course.years.find((y) => y.yearId === yearId);
        if (year) {
          yearData = year;
          break;
        }
      }
    }

    if (!yearData) {
      notFound();
    }

    return <YearContent year={yearData} />;
  } catch (error) {
    console.error("Error fetching year data:", error);
    notFound();
  }
}
