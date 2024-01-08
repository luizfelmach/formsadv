import { FormPageEntity } from "@/types";
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
        inputKey: generateId("nome"),
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
        label: "RG",
        required: true,
        defaultValue: "",
      },
      {
        inputKey: generateId(),
        type: "date",
        label: "Data de expedição do RG.",
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
  {
    title: "Informações de endereço.",
    subtitle: "Preencha corretamente os campos abaixos.",
    inputs: [
      {
        inputKey: generateId(),
        type: "textarea",
        label: "Endereço",
        required: true,
        defaultValue: "",
      },
      {
        inputKey: generateId(),
        type: "text",
        label: "Naturalidade",
        required: true,
        defaultValue: "",
      },
      {
        inputKey: generateId(),
        type: "text",
        label: "Escolaridade",
        required: true,
        defaultValue: "",
      },
      {
        inputKey: generateId(),
        type: "text",
        label: "Filiação",
        required: true,
        defaultValue: "",
      },
    ],
  },
  {
    title: "Informações de contato.",
    subtitle: "Complete seus dados de contato.",
    inputs: [
      {
        inputKey: generateId(),
        type: "text",
        label: "Telefones",
        required: false,
        defaultValue: "",
      },
      {
        inputKey: generateId(),
        type: "text",
        label: "E-mail",
        required: false,
        defaultValue: "",
      },
      {
        inputKey: generateId(),
        type: "text",
        label: "PIS/NIT",
        required: false,
        defaultValue: "",
      },
      {
        inputKey: generateId(),
        type: "text",
        label: "Senha GOV",
        required: false,
        defaultValue: "",
      },
      {
        inputKey: generateId(),
        type: "text",
        label: "Carteira de Trabalho",
        required: false,
        defaultValue: "",
      },
    ],
  },

  {
    title: "Pessoa do campo",
    subtitle:
      "Questionário relacionado às pessoas que trabalharam no meio rural.",
    inputs: [
      {
        inputKey: generateId("nasceu_zona_rural"),
        type: "radio",
        label: "Nasceu em zona rural ?",
        required: true,
        defaultValue: "",
        options: ["Sim", "Não"],
      },
    ],
  },
];

export const FormsPages: FormPageEntity[] = [...save];
