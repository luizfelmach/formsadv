import { Editor } from "@/components/pages/editor";
import { FormType } from "@/types";
import { Metadata } from "next";
import { v4 as uuid } from "uuid";

const defaultForm: FormType = {
  id: "123",
  name: "lskdjf",
  screens: [
    {
      screenKey: "uuid()",
      type: "text",
      title: "Faça uma pergunta aqui.",
      description: "",
      options: [],
      cpf: false,
      email: false,
      required: true,
      visible: [
        {
          query: "contains",
          screenKey: "uuid()",
          screenType: "text",
          value: "Luiz Machado",
        },
      ],
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

export const metadata: Metadata = {
  title: "Meu Form | Editor",
  description: "Edite seu formulário.",
};

interface EditorRouteProps {
  params: { id: string };
}

export default function EditorRoute({ params }: EditorRouteProps) {
  const { id } = params;
  return <Editor form={defaultForm} />;
}
