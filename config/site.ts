import * as yup from "yup";
import { FormPageEntity } from "@/types";
import { createSchema } from "@/lib/createSchema";

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
        inputKey: "nome",
        type: "text",
        label: "Nome completo",
        required: true,
        defaultValue: "",
      },
      {
        inputKey: "cpf",
        type: "text",
        label: "CPF",
        required: true,
        defaultValue: "",
        cpf: true,
      },
      {
        inputKey: "rg",
        type: "text",
        label: "RG / Órgão exp.",
        required: true,
        defaultValue: "",
      },
      {
        inputKey: "rg_data",
        type: "date",
        label: "Data de expedição.",
        defaultValue: "",
        required: true,
      },
      {
        inputKey: "estado_civil",
        type: "text",
        label: "Estado civil",
        required: true,
        defaultValue: "",
      },
      {
        inputKey: "profissao",
        type: "text",
        label: "Profissão",
        required: true,
        defaultValue: "",
      },
      {
        inputKey: "data_nascimento",
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
