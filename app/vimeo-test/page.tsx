"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
export default function Vimeo() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "doubt" });
      cal("ui", {
        styles: { branding: { brandColor: "#FFFFFF" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);
  return (
    <div className="py-10 w-full flex justify-center items-center overflow-scrolls">
      <Cal
        namespace="doubt"
        calLink="dhwaniacademy/doubt"
        config={{ layout: "month_view", theme: "light" }}
        className="w-full h-full"
      />
    </div>
  );
}
