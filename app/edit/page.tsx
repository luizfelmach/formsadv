import { Editor } from "@/components/editor";
import { FormType } from "@/types";
import { v4 as uuid } from "uuid";

const defaultForm: FormType = {
  id: "123",
  name: "lskdjf",
  screens: [
    {
      screenKey: uuid(),
      type: "text",
      title: "Faça uma pergunta aqui.",
      description: "",
      options: [],
      cpf: false,
      email: false,
      required: true,
      visible: [],
    },
  ],
  endScreen: {
    screenKey: uuid(),
    type: "end",
    title: "Obrigado por responder esse formulário.",
    description: "Entraremos em contato com vocẽ em breve.",
    options: [],
  },
} as const;

export default function FormBuilderPage() {
  return (
    <main>
      <Editor form={defaultForm} />
    </main>
  );
}
