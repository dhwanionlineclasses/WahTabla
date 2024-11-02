import VimeoEmbed from '@/components/VimeoEmbed'
import React from 'react'

const Vimeo = () => {
  return (
    <div>
        {/* <iframe className='w-[960px] h-[540px]' src="https://player.vimeo.com/video/992415482?badge=0&autopause=0&player_id=0&app_id=466332" allow="autoplay; fullscreen; picture-in-picture; clipboard-write\" title="Hackky Text Animation in Nextjs"></iframe> */}

        <VimeoEmbed
          videoId='992415482'
          width={900}
          height={600}
        />
        <h1>Hello</h1>
    </div>
  )
}

export default Vimeo