"use client";

import { useEffect, useState } from "react";
import { Year, Video } from "@/lib/types";
import { CourseSidebar } from "@/components/course-sidebar";
import { VideoDetails } from "@/components/video-details";
import { Button } from "./ui/button";

type YearContentProps = {
  year: Year;
};

export function YearContent({ year }: YearContentProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number>(-1);
  const [selectedWeek, setSelectedWeek] = useState<string>("");

  const allVideos = year.modules
    .flatMap((module) => module.months)
    .flatMap((month) => month.videos)
    .sort((a, b) => {
      // Extract week number from the videoTitle
      const getWeekNumber = (title: string) => {
        const match = title.match(/\d+/);
        return match ? parseInt(match[0], 10) : 999; // Default high number if no match
      };

      return getWeekNumber(a.videoTitle) - getWeekNumber(b.videoTitle);
    });

  // Set the first video as default, but only if no video is selected
  useEffect(() => {
    if (allVideos.length > 0 && selectedVideo === null && selectedWeek === "") {
      setSelectedVideo(allVideos[0]);
      setSelectedVideoIndex(0);
      setSelectedWeek("Week 1");
    }
  }, [year, allVideos, selectedWeek, selectedVideo]);

  const handlePrevVideo = () => {
    if (selectedVideoIndex > 0) {
      const prevVideo = allVideos[selectedVideoIndex - 1];
      setSelectedVideo(prevVideo);
      setSelectedVideoIndex(selectedVideoIndex - 1);
      setSelectedWeek(getWeekTitle(prevVideo.videoTitle));
    }
  };

  const handleNextVideo = () => {
    if (selectedVideoIndex < allVideos.length - 1) {
      const nextVideo = allVideos[selectedVideoIndex + 1];
      setSelectedVideo(nextVideo);
      setSelectedVideoIndex(selectedVideoIndex + 1);
      setSelectedWeek(getWeekTitle(nextVideo.videoTitle));
    }
  };

  // Helper function to extract week title
  const getWeekTitle = (videoTitle: string) => {
    const match = videoTitle.match(/\d+/);
    return match ? `Week ${match[0]}` : "Unknown Week";
  };

  console.log(year.yearName);

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <CourseSidebar
        year={year}
        selectedWeek={selectedWeek}
        onVideoSelect={(video, index, weekTitle) => {
          setSelectedVideo(video);
          setSelectedVideoIndex(index);
          setSelectedWeek(weekTitle);
          // console.log("Selected Video:", video, "setSelectedVideoIndex", index, "Selected Week:", weekTitle);
        }}
        selectedVideo={selectedVideo}
      />
      <main className="flex-1 overflow-y-auto">
        <VideoDetails video={selectedVideo} yearName={year.yearName} selectedWeek={selectedWeek} />
        <div className="mt-4 flex justify-between p-4">
          <Button
            onClick={handlePrevVideo}
            disabled={selectedVideoIndex === 0}
            className=""
          >
            Previous
          </Button>
          <Button
            onClick={handleNextVideo}
            disabled={selectedVideoIndex === allVideos.length - 1}
            className=""
          >
            Next
          </Button>
        </div>
      </main>
    </div>
  );
}
