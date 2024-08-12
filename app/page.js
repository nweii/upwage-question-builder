import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuestionForm from "/components/QuestionForm";

export default function Home() {
  return (
    <main className="container mx-auto flex min-h-screen max-w-screen-lg flex-col gap-y-12 p-4">
      <h1 className="text-2xl">Upwage Question Builder</h1>
      <Tabs defaultValue="yes_no" className="w-full">
        <TabsList className="grid h-auto w-full grid-cols-4">
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
            <span className="text-xs">Yes/No</span>
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
            <span className="text-xs">Single Select</span>
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
            <span className="text-xs">Multi Select</span>
          </TabsTrigger>
        </TabsList>
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
