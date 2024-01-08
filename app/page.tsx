import { FormSection } from "@/components/FormSection/FormSection";
import { FormsPages } from "@/config/site";

export default function Home() {
  return (
    <main className="container mx-auto max-w-2xl pt-16 px-6 flex-grow">
      <FormSection FormsPages={FormsPages} />
    </main>
  );
}
