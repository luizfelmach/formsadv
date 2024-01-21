import { InputEntity, PageEntity } from "@/components/create-form/types";
import { RespondForm } from "@/components/respond-form";

const inputs: InputEntity[] = [
  {
    inputKey: "1",
    type: "text",
    defaultValue: "",
    label: "Nome",
    pageKey: "1",
    required: true,
  },
  {
    inputKey: "2",
    type: "text",
    defaultValue: "",
    label: "Email",
    pageKey: "1",
    email: true,
  },
  {
    inputKey: "3",
    type: "text",
    defaultValue: "",
    label: "Nao sei",
    required: true,
    pageKey: "2",
  },
] as const;

const pages: PageEntity[] = [
  {
    title: "Dados pessoais",
    subtitle: "Forneça seus dados.",
    pageKey: "1",
  },
  {
    title: "Dados Resindenciais",
    subtitle: "Forneça seus dados.",
    pageKey: "2",
  },
] as const;

export default function Respond() {
  return <RespondForm inputs={inputs} pages={pages} />;
}
