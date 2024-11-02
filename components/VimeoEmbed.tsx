'use client'

import React, { useEffect, useRef } from 'react';
import Player, { Options } from '@vimeo/player';

interface VimeoEmbedProps {
  videoId: string;
  width?: number;
  height?: number;
}

const VimeoEmbed: React.FC<VimeoEmbedProps> = ({ videoId, width = 640, height = 360 }) => {
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!playerRef.current) return;

    const options: Options = {
      id: parseInt(videoId, 10),
      width,
      height,
    };

    const player = new Player(playerRef.current, options);

    player.on('play', () => console.log('Video is playing'));

    // Cleanup: Ensure player is destroyed synchronously
    return () => {
      player.destroy().catch((error) => console.error('Error destroying player:', error));
    };
  }, [videoId, width, height]);

  return <div ref={playerRef}></div>;
};

export default VimeoEmbed;