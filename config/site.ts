import { z } from "zod";
import { FormPageType } from "@/types";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Forms | Machado & Sarter advogados associados",
  description: "Formulário de atendimento de demandas previdenciárias.",
};

export const FormsPages: FormPageType[] = [
  {
    title: "Dados pessoais.",
    subtitle:
      "Forneça-nos suas informações pessoais para iniciar sua demanda previdenciária.",
    inputs: [
      {
        inputKey: "nome",
        type: "text",
        label: "Nome completo",
        isRequired: true,
        validation: z.string().min(1, "Por favor, preencha este campo."),
      },
      {
        inputKey: "cpf",
        type: "text",
        label: "CPF",
        isRequired: true,
        validation: z.string().min(1, "Por favor, preencha este campo."),
      },
      {
        inputKey: "rg",
        type: "text",
        label: "RG / Órgão exp.",
        isRequired: true,
        validation: z.string().min(1, "Por favor, preencha este campo."),
      },
      {
        inputKey: "rg_data",
        type: "date",
        label: "Data de expedição.",
        placeholder: "Selecione uma data.",
        isRequired: true,
        validation: z.coerce.date({
          errorMap: (issue, { defaultError }) => ({
            message:
              issue.code === "invalid_date"
                ? "Por favor, forneça uma data válida para continuar."
                : defaultError,
          }),
        }),
      },
      {
        inputKey: "estado_civil",
        type: "text",
        label: "Estado civil",
        isRequired: true,
        validation: z.string().min(1, "Por favor, preencha este campo."),
      },
      {
        inputKey: "profissao",
        type: "text",
        label: "Profissão",
        isRequired: true,
        validation: z.string().min(1, "Por favor, preencha este campo."),
      },
      {
        inputKey: "data_nascimento",
        type: "date",
        label: "Data de nascimento.",
        placeholder: "Selecione uma data.",
        isRequired: true,
        validation: z.coerce.date({
          errorMap: (issue, { defaultError }) => ({
            message:
              issue.code === "invalid_date"
                ? "Por favor, forneça uma data válida para continuar."
                : defaultError,
          }),
        }),
      },
    ],
  },

  {
    title: "Informações de endereço.",
    subtitle: "Preencha corretamente os campos abaixos.",
    inputs: [
      {
        inputKey: "endereco",
        type: "textarea",
        label: "Endereço",
        isRequired: true,
        validation: z.string().min(1, "Por favor, preencha este campo."),
      },
      {
        inputKey: "naturalidade",
        type: "text",
        label: "Naturalidade",
        isRequired: true,
        validation: z.string().min(1, "Por favor, preencha este campo."),
      },
      {
        inputKey: "escolaridade",
        type: "text",
        label: "Escolaridade",
        isRequired: true,
        validation: z.string().min(1, "Por favor, preencha este campo."),
      },
      {
        inputKey: "filiacao",
        type: "text",
        label: "Filiação",
        isRequired: true,
        validation: z.string().min(1, "Por favor, preencha este campo."),
      },
    ],
  },

  {
    title: "Informações de contato.",
    subtitle: "Complete seus dados de contato.",
    inputs: [
      {
        inputKey: "telefones",
        type: "text",
        label: "Telefones",
        isRequired: true,
        validation: z.string().min(1, "Por favor, preencha este campo."),
      },
      {
        inputKey: "email",
        type: "text",
        label: "E-mail",
        isRequired: false,
        validation: z.union([
          z.string().email("Email inserido é inválido."),
          z.literal(""),
        ]),
      },
      {
        inputKey: "pis_nit",
        type: "text",
        label: "PIS/NIT",
        isRequired: true,
        validation: z.string().min(1, "Por favor, preencha este campo."),
      },
      {
        inputKey: "senha_gov",
        type: "text",
        label: "Senha GOV",
        isRequired: true,
        validation: z.string().min(1, "Por favor, preencha este campo."),
      },
      {
        inputKey: "ctps",
        type: "text",
        label: "CTPS",
        isRequired: true,
        validation: z.string().min(1, "Por favor, preencha este campo."),
      },
    ],
  },

  {
    title: "Quem pode ter acesso acesso às informações de seu processo ?",
    subtitle: "",
    inputs: [
      {
        inputKey: "acesso_info",
        type: "checkbox",
        label: "Acesso às informações.",
        isRequired: true,
        options: [{ value: "Telefone" }, { value: "Email" }],
        validation: z
          .array(z.string())
          .min(1, "Por favor, selecione pelo menos uma opção."),
      },
    ],
  },

  {
    title: "Pessoa do campo",
    subtitle: "",
    inputs: [
      {
        inputKey: "nasceu_zona_rural",
        type: "radio",
        label: "Nasceu em zona rural ?",
        isRequired: true,
        options: [{ value: "Sim" }, { value: "Não" }],
        validation: z
          .array(z.string())
          .min(1, "Por favor, selecione pelo menos uma opção."),
      },
      {
        inputKey: "quando_trabalhou_zona_rural",
        type: "text",
        label: "Quando trabalhou no meio rural ?",
        placeholder: "(data, ano, idade)",
        isRequired: false,
        validation: z.string(),
        visible: {
          when: {
            inputKey: "nasceu_zona_rural",
            equals: "Sim",
          },
        },
      },
      {
        inputKey: "onde_era_zona_rural",
        type: "text",
        label: "Onde era a propriedade rural ?",
        isRequired: false,
        validation: z.string(),
        visible: {
          when: {
            inputKey: "nasceu_zona_rural",
            equals: "Sim",
          },
        },
      },
      {
        inputKey: "terra_dos_pais",
        type: "radio",
        label: "A terra era dos pais ?",
        isRequired: false,
        options: [{ value: "Sim" }, { value: "Não" }],
        visible: {
          when: {
            inputKey: "nasceu_zona_rural",
            equals: "Sim",
          },
        },
        validation: z.array(z.string()),
      },
      {
        inputKey: "arrendadas_meacao_comodato",
        type: "text",
        label: "Eram arrendadas, meação, comodato ou outro sistema ?",
        isRequired: false,
        visible: {
          when: {
            inputKey: "terra_dos_pais",
            equals: "Não",
          },
        },
        validation: z.array(z.string()),
      },

      {
        inputKey: "de_quem_era_propriedade_rural",
        type: "text",
        label: "De quem era a propriedade rural ?",
        isRequired: false,
        visible: {
          when: {
            inputKey: "terra_dos_pais",
            equals: "Não",
          },
        },
        validation: z.array(z.string()),
      },

      {
        inputKey: "possui_contratos",
        type: "radio",
        label: "Possui contratos de Parceria/Comodato ou Declarações ?",
        isRequired: false,
        options: [{ value: "Sim" }, { value: "Não" }],
        validation: z.array(z.string()),
        visible: {
          when: {
            inputKey: "nasceu_zona_rural",
            equals: "Sim",
          },
        },
      },

      {
        inputKey: "se_afastou_atividade_rural",
        type: "radio",
        label: "Já se afastou da atividade rural ?",
        isRequired: false,
        options: [{ value: "Sim" }, { value: "Não" }],
        validation: z.array(z.string()),
        visible: {
          when: {
            inputKey: "nasceu_zona_rural",
            equals: "Sim",
          },
        },
      },
      {
        inputKey: "se_afastou_por_quanto_tempo_atividade_rural",
        type: "text",
        label: "Por que e por quanto tempo ?",
        isRequired: false,
        visible: {
          when: {
            inputKey: "se_afastou_atividade_rural",
            equals: "Sim",
          },
        },
        validation: z.array(z.string()),
      },
    ],
  },
];
