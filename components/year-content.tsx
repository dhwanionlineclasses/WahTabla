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

  const allVideos = year.modules
    .flatMap((module) => module.months)
    .flatMap((month) => month.videos)
    .sort((a, b) => a.videoTitle.localeCompare(b.videoTitle))

  // Set the first video as default, but only if no video is selected
  useEffect(() => {
    if (allVideos.length > 0 && selectedVideo === null) {
      setSelectedVideo(allVideos[0]);
      setSelectedVideoIndex(0);
    }
  }, [year, allVideos, selectedVideo]);

  const handlePrevVideo = () => {
    if (selectedVideoIndex > 0) {
      const prevVideo = allVideos[selectedVideoIndex - 1];
      setSelectedVideo(prevVideo);
      setSelectedVideoIndex(selectedVideoIndex - 1);
    }
  };

  const handleNextVideo = () => {
    if (selectedVideoIndex < allVideos.length - 1) {
      const nextVideo = allVideos[selectedVideoIndex + 1];
      setSelectedVideo(nextVideo);
      setSelectedVideoIndex(selectedVideoIndex + 1);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <CourseSidebar
        year={year}
        onVideoSelect={(video, index) => {
          setSelectedVideo(video);
          setSelectedVideoIndex(index);
        }}
        selectedVideo={selectedVideo}
      />
      <main className="flex-1 overflow-y-auto">
        <VideoDetails video={selectedVideo} />
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
