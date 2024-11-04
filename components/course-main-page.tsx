"use client";

import React, { useEffect, useState } from "react";
import OverviewSidebar from "./overview-sidebar";
import CourseVideoComponent from "./course-video-compnent";
import { useModuleContent } from "@/data/get-module-content";

const CourseMainPage = ({ moduleId }: { moduleId: string }) => {
  const { data: moduleData, isError, error } = useModuleContent(moduleId);
  const [currentVideoId, setCurrentVideoId] = useState(
    moduleData?.data?.videos[0].video_id
  );

  useEffect(() => {
    if(moduleData?.data) {
        setCurrentVideoId(moduleData.data.videos[0].video_id)
    }
  },[moduleData])

  function handleSettingVideoId(videoId: string) {
    setCurrentVideoId(videoId);
  }

  if (isError || error) {
    console.log(error);
    return <span>Error: check console for more details</span>;
  }

  if (!moduleData?.data) {
    return <span>No data Found</span>;
  }


  return (
    <section className="flex mt-8 relative scroll-smooth">
      <aside className="hidden w-[400px] min-h-[92vh] h-full tablet:flex flex-col justify-start items-start sticky top-8">
        <OverviewSidebar
          moduleId={moduleId}
          handleSettingVideoId={handleSettingVideoId}
        />
      </aside>
      <div className="max-w-[1014px] w-full flex flex-col justify-start px-0 mx-auto tablet:max-w-full tablet:mx-0 tablet:pl-12">
        {currentVideoId && (
          <CourseVideoComponent
            moduleData={moduleData.data}
            videoId={currentVideoId}
          />
        )}
      </div>
    </section>
  );
};

export default CourseMainPage;
