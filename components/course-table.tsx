"use client";

import {
  Table,
  TableBody,
  TableCell,
  // TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { ParsedResponse } from "@/utils/parse-course";
import { useRouter } from "next/navigation";

export default function CoursesTable({ data }: { data: ParsedResponse }) {
  const router = useRouter();
  // If no data, show empty state
  if (!data || Object.keys(data).length === 0) {
    return (
      <Card className="w-full p-6 bg-transparent border-none shadow-none">
        <p className="text-center text-muted-foreground">
          No courses bought yet!
        </p>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-transparent border-none shadow-none">
      <ScrollArea className="h-full max-h-[600px]">
        <Table>
          <TableHeader className="bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-10">
            {/* <TableRow> */}
              {/* <TableHead className="w-[200px]">Year</TableHead> */}
              {/* <TableHead>Module</TableHead> */}
              {/* <TableHead className="w-[200px]">Progress</TableHead> */}
            {/* </TableRow> */}
          </TableHeader>
          <TableBody>
            {Object.entries(data).map(([courseId, course]) => [
              // Course Header Row
              <TableRow key={courseId} className="group hover:bg-transparent">
                <TableCell colSpan={3} className="py-6">
                  <h2 className="text-lg font-semibold tracking-tight">
                    DHWANI {course.courseName}
                  </h2>
                </TableCell>
              </TableRow>,
              // Course Years Rows
              ...(course.years?.map((year) => (
                <TableRow
                  key={`${courseId}-${year.yearId}`}
                  onClick={() => router.push(`/courses/${courseId}/year/${year.yearId}`)}
                  className="hover:bg-blue-200 cursor-pointer"
                >
                  <TableCell className="align-top font-medium">
                    {year.yearName}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap justify-start items-center gap-2">
                      {year.modules?.map((module) => (
                        <div
                          key={module.moduleId}
                          className="text-sm text-muted-foreground"
                        >
                          {module.moduleName}
                        </div>
                      )) ?? (
                        <div className="text-sm text-muted-foreground">
                          No modules
                        </div>
                      )}
                    </div>
                  </TableCell>
                  {/* <TableCell className="align-top">
                    <div className="text-sm text-muted-foreground">
                      Progress Here
                    </div>
                  </TableCell> */}
                </TableRow>
              )) ?? []),
            ])}
          </TableBody>
        </Table>
      </ScrollArea>
    </Card>
  );
}
