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

type CourseSidebarProps = {
  year: Year;
  onVideoSelect: (video: Video, index: number) => void;
  selectedVideo: Video | null;
};

export function CourseSidebar({
  year,
  onVideoSelect,
  selectedVideo,
}: CourseSidebarProps) {
  const [openModules, setOpenModules] = useState<number[]>(() =>
    year.modules.map((module) => module.moduleId)
  );
  const [openMonths, setOpenMonths] = useState<number[]>(() =>
    year.modules.flatMap((module) =>
      module.months.map((month) => month.monthId)
    )
  );

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
              className="w-full"
            >
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-start">
                  {openModules.includes(module.moduleId) ? (
                    <ChevronDown className="mr-2 h-4 w-4" />
                  ) : (
                    <ChevronRight className="mr-2 h-4 w-4" />
                  )}
                  {module.moduleName}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="w-full">
                {module.months.map((month) => (
                  <Collapsible
                    key={month.monthId}
                    open={openMonths.includes(month.monthId)}
                    onOpenChange={() => toggleMonth(month.monthId)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="ml-4 w-full justify-start"
                      >
                        {openMonths.includes(month.monthId) ? (
                          <ChevronDown className="mr-2 h-4 w-4" />
                        ) : (
                          <ChevronRight className="mr-2 h-4 w-4" />
                        )}
                        {month.monthName}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="w-full">
                      {month.videos
                        .sort((a, b) => a.videoTitle.localeCompare(b.videoTitle))
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
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </ScrollArea>
        <Link href='/profile' className="absolute bottom-0 left-0 w-full">
          <Button variant='outline' className="w-full bg-white">
            Profile
          </Button>
        </Link>
    </div>
  );
}
