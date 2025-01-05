import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import ProfileSidebar from "@/components/profile-sidebar";
import ProfileModuleList from "@/components/profile-module-list";
import Profile from "@/components/profile";
import { getProfile } from "@/action/profile/getProfile";

const ProfilePage = async () => {
  const queryClient = new QueryClient();


  await queryClient.prefetchQuery({
    queryKey: ["getFullProfile"],
    queryFn: getProfile,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="w-full flex mt-8 relative scroll-smooth">
        <aside className="hidden w-[300px] h-full md:flex flex-col justify-start items-start sticky top-8">
          <ProfileSidebar />
        </aside>
        <div className="max-w-[1196px] w-full flex flex-col desktop:flex-row justify-start px-0 mx-auto tablet:max-w-full tablet:mx-0 tablet:pl-4 tablet:gap-4">
          <ProfileModuleList />
          <Profile />
        </div>
      </section>
    </HydrationBoundary>
  );
};

export default ProfilePage;
