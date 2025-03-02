import { Video } from "@/lib/types";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { getTheoryLink, getThisWeekNoteLink } from "@/utils/get-notes";
// import { useState } from "react";

type VideoDetailsProps = {
  video: Video | null;
};

export function VideoDetails({ video }: VideoDetailsProps) {
  // const [showPdf, setShowPdf] = useState(false);

  if (!video) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Select a video to view details</p>
      </div>
    );
  }

  const openPdf = (url: string | null) => {
    if (!url) return
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="p-6">
      <Link href="/profile" className="md:hidden">
        <Button variant="outline" className="rounded-full">
          <ArrowLeftIcon />
          Profile
        </Button>
      </Link>
      <h2 className="mb-4 text-2xl font-bold">{video.videoTitle}</h2>
      <div className="aspect-video mb-4">
        <iframe
          src={`https://player.vimeo.com/video/${video.videoVimeoId}`}
          width="100%"
          height="100%"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <p className="mb-2 text-sm text-muted-foreground">
        Duration: {Math.floor(video.duration / 60)} minutes
      </p>
      <div className="w-full flex justify-between items-center mb-4">
        <h1>By Pandit Abhijit Banerjee</h1>
        <div className="flex justify-center items-center gap-2 mt-6">
          <Button
            onClick={() =>
              openPdf(getTheoryLink(video.videoTitle))
            }
            variant="secondary"
          >
            {/* {showPdf ? 'Hide Notes' : 'View Lecture Notes'} */}
            View Theory
          </Button>
          <Button
            onClick={() =>
              openPdf(getThisWeekNoteLink(video.videoTitle))
            }
            variant="secondary"
          >
            {/* {showPdf ? 'Hide Notes' : 'View Lecture Notes'} */}
            View Lecture Notes
          </Button>
        </div>
      </div>
      <p className="text-muted-foreground">{video.description}</p>
      {/* {showPdf && (
            <div className="mt-4 w-full h-[1000px]">
              <iframe
                src={`https://74qwidbqes.ufs.sh/f/o3YfRzT9WCauDq0M6LSoVgRnyQLiADH6p4me8x2fYPzqXu0M#toolbar=0`}
                width="100%"
                height="100%"
                style={{ border: 'none' }}
                className="rounded-lg shadow-lg"
              />
            </div>
          )} */}
    </div>
  );
}
