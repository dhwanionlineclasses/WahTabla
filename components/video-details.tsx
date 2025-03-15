import { Video } from "@/lib/types";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { getTheoryLink, getThisWeekNoteLink } from "@/utils/get-notes";
// import { useState } from "react";

type VideoDetailsProps = {
  video: Video | null;
  yearName: string;
  selectedWeek: string;
};

export function VideoDetails({ video, yearName, selectedWeek }: VideoDetailsProps) {
  // const [showPdf, setShowPdf] = useState(false);
  // console.log("VideoDetails: Week:", selectedWeek, "Video:", video);

    const openPdf = (url: string | null) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  
  if (!video) {
    return (
      <div className="flex h-4/5 items-center justify-center">
        {selectedWeek ? (
          <div className="flex flex-col justify-center items-center gap-8">
            <Button variant="outline" className="rounded-full">
              📅 {selectedWeek} (No Video Available)
            </Button>
            <div className="flex justify-center items-center gap-2 mt-6">
              <Button
                onClick={() => openPdf(getTheoryLink(selectedWeek, yearName))}
                variant="secondary"
              >
                {/* {showPdf ? 'Hide Notes' : 'View Lecture Notes'} */}
                View Theory
              </Button>
              <Button
                onClick={() => openPdf(getThisWeekNoteLink(selectedWeek, yearName))}
                variant="secondary"
              >
                {/* {showPdf ? 'Hide Notes' : 'View Lecture Notes'} */}
                View Lecture Notes
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground">
            Select a video to view details
          </p>
        )}
      </div>
    );
  }


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
            onClick={() => openPdf(getTheoryLink(selectedWeek, yearName))}
            variant="secondary"
          >
            {/* {showPdf ? 'Hide Notes' : 'View Lecture Notes'} */}
            View Theory
          </Button>
          <Button
            onClick={() => openPdf(getThisWeekNoteLink(selectedWeek, yearName))}
            variant="secondary"
          >
            {/* {showPdf ? 'Hide Notes' : 'View Lecture Notes'} */}
            View Lecture Notes
          </Button>
        </div>
      </div>
      <p className="text-muted-foreground">{video.description}</p>
    </div>
  );
}
