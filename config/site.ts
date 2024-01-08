import * as yup from "yup";
import { FormPageEntity } from "@/types";
import { createSchema } from "@/lib/createSchema";
import { generateId } from "@/lib/utils";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Forms | Machado & Sarter advogados associados",
  description: "Formulário de atendimento de demandas previdenciárias.",
};

const save: FormPageEntity[] = [
  {
    title: "Dados pessoais.",
    subtitle:
      "Forneça-nos suas informações pessoais para iniciar sua demanda previdenciária.",
    inputs: [
      {
        inputKey: generateId(),
        type: "text",
        label: "Nome completo",
        required: true,
        defaultValue: "",
      },
      {
        inputKey: generateId(),
        type: "text",
        label: "CPF",
        required: true,
        defaultValue: "",
        cpf: true,
      },
      {
        inputKey: generateId(),
        type: "text",
        label: "RG / Órgão exp.",
        required: true,
        defaultValue: "",
      },
      {
        inputKey: generateId(),
        type: "date",
        label: "Data de expedição.",
        defaultValue: "",
        required: true,
      },
      {
        inputKey: generateId(),
        type: "text",
        label: "Estado civil",
        required: true,
        defaultValue: "",
      },
      {
        inputKey: generateId(),
        type: "text",
        label: "Profissão",
        required: true,
        defaultValue: "",
      },
      {
        inputKey: generateId(),
        type: "date",
        label: "Data de nascimento.",
        required: true,
        defaultValue: "",
      },
    ],
  },
];

export const FormsPages: FormPageEntity[] = [save[0]];

export const FormsSchema = createSchema(
  FormsPages.map((form) => form.inputs).flat()
);
