import { CreateForm } from "@/components/create-form";

const pages: any = [] as const;
const inputs: any = [] as const;

export default function CreateFormPage() {
  return (
    <main>
      <CreateForm pages={pages} inputs={inputs} />
    </main>
  );
}
