import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuestionForm from "/components/QuestionForm";

export default function Home() {
  return (
    <main className="container mx-auto flex min-h-screen max-w-screen-lg flex-col gap-y-12 p-4">
      <h1 className="text-2xl">Upwage Question Builder</h1>
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid h-auto w-full grid-cols-5">
          <TabsTrigger
            value="basic"
            className="flex flex-col items-center justify-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sm:mb-1"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            <span className="text-xs">Basic</span>
          </TabsTrigger>
          <TabsTrigger
            value="yes_no"
            className="flex flex-col items-center justify-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sm:mb-1"
            >
              <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <span className="text-xs">
              <span className="sm:hidden">Y/N</span>
              <span className="hidden sm:inline">Yes/No</span>
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="number"
            className="flex flex-col items-center justify-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sm:mb-1"
            >
              <line x1="4" x2="20" y1="9" y2="9" />
              <line x1="4" x2="20" y1="15" y2="15" />
              <line x1="10" x2="8" y1="3" y2="21" />
              <line x1="16" x2="14" y1="3" y2="21" />
            </svg>
            <span className="text-xs">Number</span>
          </TabsTrigger>
          <TabsTrigger
            value="single_select"
            className="flex flex-col items-center justify-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sm:mb-1"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="1" />
            </svg>
            <span className="text-xs">
              Single
              <span className="hidden sm:inline"> Select</span>
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="multi_select"
            className="flex flex-col items-center justify-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sm:mb-1"
            >
              <path d="m12 15 2 2 4-4" />
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
            <span className="text-xs">
              Multi
              <span className="hidden sm:inline"> Select</span>
            </span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="basic">
          <QuestionForm type="basic" />
        </TabsContent>
        <TabsContent value="yes_no">
          <QuestionForm type="yes_no" />
        </TabsContent>
        <TabsContent value="number">
          <QuestionForm type="number" />
        </TabsContent>
        <TabsContent value="single_select">
          <QuestionForm type="single_select" />
        </TabsContent>
        <TabsContent value="multi_select">
          <QuestionForm type="multi_select" />
        </TabsContent>
      </Tabs>
    </main>
  );
}
