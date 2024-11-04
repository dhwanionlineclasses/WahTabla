import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";


import { getCourse } from "@/action/course/getCourse";
import CourseMainPage from "@/components/course-main-page";

const CourseVideoPage = async ({ params }: { params: { slug: string } }) => {
  const moduleId = params.slug;
  const queryClient = new QueryClient();
  
  await queryClient.prefetchQuery({
    queryKey: ["getModule"],
    // @ts-expect-error: idk why will fix later
    queryFn: getCourse,
  });
  // const content
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CourseMainPage moduleId={moduleId} />
    </HydrationBoundary>
  );
};

export default CourseVideoPage;
