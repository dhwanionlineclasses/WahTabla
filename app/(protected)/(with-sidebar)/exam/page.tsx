import TallyEmbed from "@/components/exam-form";
import React from "react";

const Page = () => {
  return (
    <div className="max-w-[1196px] w-full flex flex-col desktop:flex-row justify-start px-0 mx-auto tablet:max-w-full tablet:mx-0 tablet:pl-4 tablet:gap-4">
      <div className="w-full h-full flex justify-center items-start">

       <TallyEmbed />
      </div>
    </div>
  );
};

export default Page;
