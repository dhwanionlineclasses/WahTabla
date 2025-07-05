"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, VideoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Year, Video } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

type CourseSidebarProps = {
  courseId: number;
  year: Year;
  selectedWeek: string | null;
  onVideoSelect: (
    video: Video | null,
    index: number,
    weekTitle: string
  ) => void;
  selectedVideo: Video | null;
};

export function CourseSidebar({
  courseId,
  year,
  selectedWeek,
  onVideoSelect,
}: CourseSidebarProps) {
  const [openModules, setOpenModules] = useState<number[]>(() =>
    year.modules.map((module) => module.moduleId)
  );
  const [openMonths, setOpenMonths] = useState<number[]>(() =>
    year.modules.flatMap((module) =>
      module.months.map((month) => month.monthId)
    )
  );

  const router = useRouter();

  let weekCounter = 1;

  const toggleModule = (moduleId: number) => {
    setOpenModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const toggleMonth = (monthId: number) => {
    setOpenMonths((prev) =>
      prev.includes(monthId)
        ? prev.filter((id) => id !== monthId)
        : [...prev, monthId]
    );
  };

  // console.log(year)

  return (
    <div className="hidden md:block relative h-[calc(100vh-4rem)] w-80 border-r p-1 pl-0">
      <ScrollArea className="h-[calc(100vh-7rem)] w-full">
        <div className="w-full p-4">
          <h2 className="mb-4 text-lg font-semibold">{year.yearName}</h2>
          {year.modules.map((module) => (
            <Collapsible
              key={module.moduleId}
              open={openModules.includes(module.moduleId)}
              onOpenChange={() => toggleModule(module.moduleId)}
              className="w-full py-1"
            >
              <CollapsibleTrigger asChild>
                <Button variant="default" className="w-full justify-start">
                  {openModules.includes(module.moduleId) ? (
                    <ChevronDown className="mr-2 h-4 w-4" />
                  ) : (
                    <ChevronRight className="mr-2 h-4 w-4" />
                  )}
                  {module.moduleName}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="w-full">
                {module.months.map((month) => {
                  const totalWeeks = 4; // Each month has 4 weeks
                  const allWeeks = Array.from(
                    { length: totalWeeks },
                    () => `Week ${weekCounter++}`
                  );

                  // Normalize video titles for correct matching
                  const videoMap = new Map(
                    month.videos.map((video) => {
                      const normalizedTitle = video.videoTitle
                        .toLowerCase()
                        .replace(/\.(mp4|mov|avi)$/i, "") // Remove file extensions
                        .replace(/(:| - ).*$/, "") // Remove descriptions after ":" or " - "
                        .replace(/\b(\d+)(st|nd|rd|th)\b/, "$1") // Remove ordinal suffixes (1st, 2nd, 3rd, 4th, etc.)
                        .replace(/&.*/, ""); // Remove everything after "&" to keep only the first number

                      return [normalizedTitle, video];
                    })
                  );
                  // console.log(videoMap);
                  return (
                    <Collapsible
                      key={month.monthId}
                      open={openMonths.includes(month.monthId)}
                      onOpenChange={() => toggleMonth(month.monthId)}
                    >
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className="ml-4 w-full border border-black justify-start"
                        >
                          {openMonths.includes(month.monthId) ? (
                            <ChevronDown className="mr-2 h-4 w-4" />
                          ) : (
                            <ChevronRight className="mr-2 h-4 w-4" />
                          )}
                          {month.monthName}
                        </Button>
                      </CollapsibleTrigger>
                      {/* <CollapsibleContent className="w-full">
                        {month.videos
                          .sort((a, b) =>
                            a.videoTitle.localeCompare(b.videoTitle)
                          )
                          .map((video, index) => (
                            <Button
                              key={video.videoId}
                              variant="ghost"
                              className={cn(
                                "ml-8 w-full justify-start",
                                selectedVideo?.videoId === video.videoId
                                  ? "bg-white"
                                  : ""
                              )}
                              onClick={() => onVideoSelect(video, index)}
                            >
                              <VideoIcon className="mr-2 h-4 w-4" />
                              {video.videoTitle}
                            </Button>
                          ))}
                      </CollapsibleContent> */}
                      <CollapsibleContent className="w-full">
                        {allWeeks.map((weekTitle, index) => {
                          const normalizedWeekTitle = weekTitle.toLowerCase();
                          const video = videoMap.get(normalizedWeekTitle);
                          const isSelected = selectedWeek === weekTitle;
                          // const isSelected = selectedVideo?.videoTitle === video?.videoTitle;

                          const weekNumberMatch = weekTitle.match(/\d+/);
                          const weekNumber = weekNumberMatch
                            ? parseInt(weekNumberMatch[0], 10)
                            : index + 1;

                          return (
                            <Button
                              key={index}
                              variant="ghost"
                              className={cn(
                                "ml-8 w-full justify-start",
                                isSelected ? "bg-white" : ""
                              )}
                              onClick={() => {
                                onVideoSelect(
                                  video || null,
                                  weekNumber - 1,
                                  weekTitle
                                );
                                console.log("Week index Clicked:", weekNumber);
                              }}
                            >
                              {video ? (
                                <VideoIcon className="mr-2 h-4 w-4" />
                              ) : (
                                <span className="mr-2 h-4 w-4" /> // Placeholder to align text properly
                              )}
                              {weekTitle}
                            </Button>
                          );
                        })}
                      </CollapsibleContent>
                    </Collapsible>
                  );
                })}
              </CollapsibleContent>
            </Collapsible>
          ))}
          <Button
            variant="destructive"
            onClick={() =>
              router.push(
                `/exam/final/courses/${courseId}/year/${year.yearId}/week/52`
              )
            }
            className="w-full mt-2"
          >
            Final Exam
          </Button>
        </div>
      </ScrollArea>
      <Link href="/profile" className="absolute bottom-0 left-0 w-full">
        <Button variant="outline" className="w-full bg-white">
          Profile
        </Button>
      </Link>
    </div>
  );
}
