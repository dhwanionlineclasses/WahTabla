export type Video = {
  videoId: number;
  videoTitle: string;
  videoUrl: string;
  videoVimeoId: string;
  description: string;
  duration: number;
  thumbnailUrl: string;
};

export type Month = {
  monthId: number;
  monthName: string;
  videos: Video[];
};

export type Module = {
  moduleId: number;
  moduleName: string;
  months: Month[];
};

export type Year = {
  yearId: number;
  yearName: string;
  vimeoYearId: string;
  modules: Module[];
};

export type Course = {
  courseName: string;
  vimeoCourseId: string;
  years: Year[];
};

export type ParsedResponse = {
  [courseId: number]: Course;
};
