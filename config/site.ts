import { z } from "zod";
import { FormPageType } from "@/types";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Forms | Machado & Sarter advogados associados",
  description: "Formulário de atendimento de demandas previdenciárias.",
};

export const FormsPages: FormPageType[] = [
  {
    title: "Olá, precisamos conhecer melhor você!",
    subtitle: "Informe seu nome completo no campo abaixo.",
    inputs: [
      {
        inputKey: "nome",
        type: "text",
        label: "Nome",
        isRequired: true,
        validation: z.string().min(1, "Insira seu nome."),
      },
      {
        inputKey: "easteregg",
        type: "text",
        label: "Easter Egg",
        isRequired: false,
        validation: z.string().min(1, "Insira seu nome."),
      },
      {
        inputKey: "teste",
        type: "text",
        label: "teste",
        isRequired: false,
        validation: z.string().min(1, "Insira seu nome."),
      },
      {
        inputKey: "teste1",
        type: "text",
        label: "teste1",
        isRequired: false,
        validation: z.string().min(1, "Insira seu nome."),
      },
      {
        inputKey: "teste2",
        type: "date",
        label: "teste2",
        placeholder: "Escolha uma data",
        isRequired: false,
        validation: z.string().min(1, "Insira seu nome."),
      },

      {
        inputKey: "teste3",
        type: "checkbox",
        label: "teste3",
        placeholder: "Escolha uma data",
        isRequired: false,
        validation: z.string().min(1, "Insira seu nome."),
        options: [
          {
            value: "option 1",
          },
          {
            value: "Option 2",
          },
          {
            value: "Option 3",
          },
          {
            value: "Option 4",
          },
        ],
      },

      {
        inputKey: "teste4",
        type: "radio",
        label: "teste4",
        placeholder: "Escolha uma data",
        isRequired: false,
        validation: z.string().min(1, "Insira seu nome."),
        options: [
          {
            value: "option 1",
          },
          {
            value: "Option 2",
          },
          {
            value: "Option 3",
          },
          {
            value: "Option 4",
          },
        ],
      },
    ],
  },

  {
    title: "Digite seu CPF!",
    subtitle: "Insira somente os números.",
    inputs: [
      {
        inputKey: "cpf",
        type: "text",
        label: "CPF",
        isRequired: true,
        validation: z.string(),
      },
    ],
  },
];
