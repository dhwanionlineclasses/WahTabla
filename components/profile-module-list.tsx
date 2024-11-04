"use client";

import { useAllModuleContent } from "@/data/get-all-module";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { Slider } from "./ui/slider";

const ProfileModuleList = () => {
  const router = useRouter();
  const { data: modules, isError, error, isPending } = useAllModuleContent();
  if (isError || error) {
    return <span>No Data Found</span>;
  }
  return (
    <div className="max-w-[1032px] w-full min-h-[92vh] bg-white rounded-lg flex justify-start items-start p-4 shadow-sm">
      <div className="max-w-[1000px] w-full h-full flex flex-col justify-start items-start gap-8 p-2 bg-muted rounded-lg">
        <div className="w-full flex justify-between items-center px-4 pt-4">
          <span className="text-2xl font-semibold">
            Your Modules({modules?.data?.length})
          </span>
          <Button variant="secondary" className="font-semibold shadow-none border-none hover:underline">View All</Button>
        </div>
        {!isPending && modules.data ? (
          <div className="w-full flex flex-col gap-6">
            <table className="w-full border-collapse">
              <thead className="w-full">
                <tr className="">
                  <th className="p-4 text-left text-muted-foreground/40 font-semibold">
                    Course Name
                  </th>
                  <th className="p-4 text-left text-muted-foreground/40 font-semibold">
                    Start
                  </th>
                  <th className="p-4 text-left text-muted-foreground/40 font-semibold">
                    Status
                  </th>
                  <th className="p-4 text-left text-muted-foreground/40 font-semibold">
                    Module
                  </th>
                  <th className="p-4 text-left text-muted-foreground/40 font-semibold">
                    Progress
                  </th>
                </tr>
              </thead>
              <tbody className="w-full">
                {modules.data.map((item, index) => (
                  <tr
                    key={index}
                    className="cursor-pointer hover:bg-white rounded-lg"
                    onClick={() =>
                      router.push(`/course/${item.vimeo_module_id}`)
                    }
                  >
                    <td className="p-4 flex justify-start items-center gap-2">
                      <Image
                        src="/module-thumbnail.jpg"
                        alt="module-thumbnail"
                        width={0}
                        height={0}
                        className="w-14 h-14"
                      />
                      <div className="flex flex-col justify-start items-start">
                        <Button
                          variant="ghost"
                          className="text-xl font-semibold capitalize pl-0 hover:bg-white"
                        >
                          {item.title}
                        </Button>
                        <span className="text-xs text-muted-foreground/40">
                          Pandit Abhijit Banerjee
                        </span>
                      </div>
                    </td>
                    <td className="p-4">Feb 14</td>{" "}
                    {/* Replace with actual start data if available */}
                    <td className="p-4">
                      <Badge className="bg-white text-black hover:bg-white px-2 py-1">
                        Completed
                      </Badge>
                    </td>{" "}
                    {/* Replace with actual status if available */}
                    <td className="p-4">
                      <Badge className="bg-black text-white hover:bg-black px-2 py-1">
                        Prathama
                      </Badge>
                    </td>
                    <td className="p-4">
                    <Slider aria-readonly defaultValue={[100]} max={100} step={1} className="cursor-default pointer-events-none" />
                    </td>{" "}
                    {/* Replace with actual progress if available */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <span>Loading...</span>
        )}
      </div>
    </div>
  );
};

export default ProfileModuleList;
