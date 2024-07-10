import NumberQuestion from "@/components/NumberQuestion";
import YesNo from "../components/YesNo";

export default function Home() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col gap-y-12 p-4">
      <h1 className="text-2xl">Upwage Question Builders</h1>
      <section>
        <h2 className="mb-6 text-xl text-black/70">Yes/No</h2>
        <YesNo />
      </section>
      <section>
        <h2 className="mb-6 text-xl text-black/70">Number</h2>
        <NumberQuestion />
      </section>
    </main>
  );
}
