import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { getAllCourse } from "@/action/course/getAllCourses";
import ProfileSidebar from "@/components/profile-sidebar";
import ProfileModuleList from "@/components/profile-module-list";
import Profile from "@/components/profile";

const ProfilePage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["getAllModule"],
    queryFn: getAllCourse,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="flex mt-8 relative scroll-smooth">
        <aside className="hidden w-[400px] min-h-[92vh] h-full tablet:flex flex-col justify-start items-start sticky top-8">
          <ProfileSidebar />
        </aside>
        <div className="max-w-[1114px] w-full flex justify-start px-0 mx-auto tablet:max-w-full tablet:mx-0 tablet:pl-4 tablet:gap-4">
          <ProfileModuleList />
          <Profile />
        </div>
      </section>
    </HydrationBoundary>
  );
};

export default ProfilePage;
