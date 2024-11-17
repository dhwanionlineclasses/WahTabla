import DoubtClearingEmbedd from '@/components/doubt-clearing-embedd'
import ProfileSidebar from '@/components/profile-sidebar'
import React from 'react'

const DoubtClearingPage = () => {
  return (
    <section className="w-full flex mt-8 relative scroll-smooth">
        <aside className="hidden w-[250px] h-full md:flex flex-col justify-start items-start sticky top-8">
          <ProfileSidebar />
        </aside>
        <div className="max-w-[1196px] w-full flex justify-start px-0 mx-auto tablet:max-w-full tablet:mx-0 tablet:pl-4 tablet:gap-4">
          <DoubtClearingEmbedd />
        </div>
      </section>
  )
}

export default DoubtClearingPage