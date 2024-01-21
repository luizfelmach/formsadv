import { RespondForm } from "@/components/respond-form";

export default function Home() {
  return (
    <main className="container mx-auto max-w-2xl pt-16 px-6 flex-grow">
      <RespondForm pages={[]} inputs={[]} />
    </main>
  );
}
