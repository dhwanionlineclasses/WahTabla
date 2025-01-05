import { Video } from "@/lib/types";
import Link from 'next/link';
import { Button } from "./ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

type VideoDetailsProps = {
  video: Video | null;
};

export function VideoDetails({ video }: VideoDetailsProps) {
  if (!video) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Select a video to view details</p>
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
      <p className="text-muted-foreground">{video.description}</p>
    </div>
  );
}
