import QuestionForm from "/components/QuestionForm";

export default function Home() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col gap-y-12 p-4">
      <h1 className="text-2xl">Upwage Question Builders</h1>
      <section>
        <h2 className="mb-6 text-xl font-semibold text-black/70 dark:text-white/70">
          Yes/No
        </h2>
        <QuestionForm type="yes_no" />
      </section>
      <section>
        <h2 className="mb-6 text-xl font-semibold text-black/70 dark:text-white/70">
          Number
        </h2>
        <QuestionForm type="number" />
      </section>
    </main>
  );
}
