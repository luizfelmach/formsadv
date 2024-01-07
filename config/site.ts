import * as yup from "yup";
import { FormPageType } from "@/types";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Forms | Machado & Sarter advogados associados",
  description: "Formulário de atendimento de demandas previdenciárias.",
};

const save: FormPageType[] = [
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
        defaultValue: "",
        validation: yup.string().required("Campo obrigatório."),
      },
      {
        inputKey: "cpf",
        type: "text",
        label: "CPF",
        isRequired: true,
        defaultValue: "",
        validation: yup.string().required("Campo obrigatório."),
      },
      {
        inputKey: "rg",
        type: "text",
        label: "RG / Órgão exp.",
        isRequired: true,
        defaultValue: "",
        validation: yup.string().required("Campo obrigatório."),
      },
      {
        inputKey: "rg_data",
        type: "date",
        label: "Data de expedição.",
        defaultValue: "",
        placeholder: "Selecione uma data.",
        isRequired: true,
        validation: yup
          .date()
          .typeError("Campo obrigatório.")
          .required("Campo obrigatório."),
      },
      {
        inputKey: "estado_civil",
        type: "text",
        label: "Estado civil",
        isRequired: true,
        defaultValue: "",
        validation: yup.string().required("Campo obrigatório."),
      },
      {
        inputKey: "profissao",
        type: "text",
        label: "Profissão",
        isRequired: true,
        defaultValue: "",
        validation: yup.string().required("Campo obrigatório."),
      },
      {
        inputKey: "data_nascimento",
        type: "date",
        label: "Data de nascimento.",
        placeholder: "Selecione uma data.",
        isRequired: true,
        defaultValue: "",
        validation: yup.string().required("Campo obrigatório."),
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
        defaultValue: "",
        validation: yup.string().required("Campo obrigatório."),
      },
      {
        inputKey: "naturalidade",
        type: "text",
        label: "Naturalidade",
        isRequired: true,
        defaultValue: "",
        validation: yup.string().required("Campo obrigatório."),
      },
      {
        inputKey: "escolaridade",
        type: "text",
        label: "Escolaridade",
        isRequired: true,
        defaultValue: "",
        validation: yup.string().required("Campo obrigatório."),
      },
      {
        inputKey: "filiacao",
        type: "text",
        label: "Filiação",
        isRequired: true,
        defaultValue: "",
        validation: yup.string().required("Campo obrigatório."),
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
        defaultValue: "",
        validation: yup.string().required("Campo obrigatório."),
      },
      {
        inputKey: "email",
        type: "text",
        label: "E-mail",
        isRequired: false,
        defaultValue: "",
        validation: yup.string().email("Campo deve ser um e-mail válido"),
      },
      {
        inputKey: "pis_nit",
        type: "text",
        label: "PIS/NIT",
        isRequired: true,
        defaultValue: "",
        validation: yup.string().required("Campo obrigatório."),
      },
      {
        inputKey: "senha_gov",
        type: "text",
        label: "Senha GOV",
        isRequired: true,
        defaultValue: "",
        validation: yup.string().required("Campo obrigatório."),
      },
      {
        inputKey: "ctps",
        type: "text",
        label: "CTPS",
        isRequired: true,
        defaultValue: "",
        validation: yup.string().required("Campo obrigatório."),
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
        defaultValue: [],
        options: [{ value: "Telefone" }, { value: "Email" }],
        validation: yup
          .array(yup.string())
          .min(1, "Selecione pelo menos uma opção."),
      },
    ],
  },

  {
    title: "Pessoa do campo",
    subtitle:
      "Questionário relacionado às pessoas que trabalharam no meio rural.",
    inputs: [
      {
        inputKey: "nasceu_zona_rural",
        type: "radio",
        label: "Nasceu em zona rural ?",
        isRequired: true,
        defaultValue: "",
        options: [{ value: "Sim" }, { value: "Não" }],
        validation: yup.string().required("Campo obrigatório."),
      },
      {
        inputKey: "quando_trabalhou_zona_rural",
        type: "text",
        label: "Quando trabalhou no meio rural ?",
        placeholder: "(data, ano, idade)",
        isRequired: true,
        defaultValue: "",
        visible: {
          when: {
            inputKey: "nasceu_zona_rural",
            equals: "Sim",
          },
        },
        validation: yup.string().when("nasceu_zona_rural", {
          is: "Sim",
          then: (schema) => schema.required("Campo obrigatório."),
        }),
      },
      {
        inputKey: "onde_era_zona_rural",
        type: "text",
        label: "Onde era a propriedade rural ?",
        isRequired: true,
        defaultValue: "",
        visible: {
          when: {
            inputKey: "nasceu_zona_rural",
            equals: "Sim",
          },
        },
        validation: yup.string().when("nasceu_zona_rural", {
          is: "Sim",
          then: (schema) => schema.required("Campo obrigatório."),
        }),
      },
      {
        inputKey: "terra_dos_pais",
        type: "radio",
        label: "A terra era dos pais ?",
        isRequired: true,
        defaultValue: "",
        options: [{ value: "Sim" }, { value: "Não" }],
        visible: {
          when: {
            inputKey: "nasceu_zona_rural",
            equals: "Sim",
          },
        },
        validation: yup.string().when("nasceu_zona_rural", {
          is: "Sim",
          then: (schema) => schema.required("Campo obrigatório."),
        }),
      },
      {
        inputKey: "arrendadas_meacao_comodato",
        type: "text",
        defaultValue: "",
        label: "Eram arrendadas, meação, comodato ou outro sistema ?",
        isRequired: true,
        visible: {
          when: {
            inputKey: "terra_dos_pais",
            equals: "Não",
          },
        },
        validation: yup.string().when("terra_dos_pais", {
          is: "Não",
          then: (schema) => schema.required("Campo obrigatório."),
        }),
      },

      {
        inputKey: "de_quem_era_propriedade_rural",
        type: "text",
        defaultValue: "",
        label: "De quem era a propriedade rural ?",
        isRequired: true,
        visible: {
          when: {
            inputKey: "terra_dos_pais",
            equals: "Não",
          },
        },
        validation: yup.string().when("terra_dos_pais", {
          is: "Não",
          then: (schema) => schema.required("Campo obrigatório."),
        }),
      },

      {
        inputKey: "possui_contratos",
        type: "radio",
        defaultValue: "",
        label: "Possui contratos de Parceria/Comodato ou Declarações ?",
        isRequired: true,
        options: [{ value: "Sim" }, { value: "Não" }],
        visible: {
          when: {
            inputKey: "nasceu_zona_rural",
            equals: "Sim",
          },
        },
        validation: yup.string().when("nasceu_zona_rural", {
          is: "Sim",
          then: (schema) => schema.required("Campo obrigatório."),
        }),
      },

      {
        inputKey: "se_afastou_atividade_rural",
        type: "radio",
        defaultValue: "",
        label: "Já se afastou da atividade rural ?",
        isRequired: true,
        options: [{ value: "Sim" }, { value: "Não" }],
        visible: {
          when: {
            inputKey: "nasceu_zona_rural",
            equals: "Sim",
          },
        },
        validation: yup.string().when("nasceu_zona_rural", {
          is: "Sim",
          then: (schema) => schema.required("Campo obrigatório."),
        }),
      },
      {
        inputKey: "se_afastou_por_quanto_tempo_atividade_rural",
        type: "text",
        defaultValue: "",
        label: "Por que e por quanto tempo ?",
        isRequired: true,
        visible: {
          when: {
            inputKey: "se_afastou_atividade_rural",
            equals: "Sim",
          },
        },
        validation: yup.string().when("se_afastou_atividade_rural", {
          is: "Sim",
          then: (schema) => schema.required("Campo obrigatório."),
        }),
      },
      {
        inputKey:
          "Quantas pessoas da sua família trabalhavam nesta propriedade rural",
        type: "text",
        defaultValue: "",
        label:
          "Quantas pessoas da sua família trabalhavam nesta propriedade rural ?",
        isRequired: true,
        visible: {
          when: {
            inputKey: "nasceu_zona_rural",
            equals: "Sim",
          },
        },
        validation: yup.string().when("nasceu_zona_rural", {
          is: "Sim",
          then: (schema) => schema.required("Campo obrigatório."),
        }),
      },

      {
        inputKey:
          "Qual era o tamanho das terras? Quanto deste espaço era utilizado para plantio ou criação de animais ?",
        type: "textarea",
        defaultValue: "",
        label:
          "Qual era o tamanho das terras? Quanto deste espaço era utilizado para plantio ou criação de animais ?",
        isRequired: true,
        visible: {
          when: {
            inputKey: "nasceu_zona_rural",
            equals: "Sim",
          },
        },
        validation: yup.string().when("nasceu_zona_rural", {
          is: "Sim",
          then: (schema) => schema.required("Campo obrigatório."),
        }),
      },

      {
        inputKey:
          "O que era plantado e criado na propriedade rural ? Quantidade ?",
        type: "textarea",
        defaultValue: "",
        label:
          "O que era plantado e criado na propriedade rural ? Quantidade ?",
        isRequired: true,
        visible: {
          when: {
            inputKey: "nasceu_zona_rural",
            equals: "Sim",
          },
        },
        validation: yup.string().when("nasceu_zona_rural", {
          is: "Sim",
          then: (schema) => schema.required("Campo obrigatório."),
        }),
      },
      {
        inputKey: "Qual a quantidade anual da colheita ?",
        type: "text",
        defaultValue: "",
        label: "Qual a quantidade anual da colheita ?",
        isRequired: true,
        visible: {
          when: {
            inputKey: "nasceu_zona_rural",
            equals: "Sim",
          },
        },
        validation: yup.string().when("nasceu_zona_rural", {
          is: "Sim",
          then: (schema) => schema.required("Campo obrigatório."),
        }),
      },

      {
        inputKey: "Quantos empregados ou meeiros tinham na propriedade rural ?",
        type: "text",
        defaultValue: "",
        label: "Quantos empregados ou meeiros tinham na propriedade rural ?",
        isRequired: true,
        visible: {
          when: {
            inputKey: "nasceu_zona_rural",
            equals: "Sim",
          },
        },
        validation: yup.string().when("nasceu_zona_rural", {
          is: "Sim",
          then: (schema) => schema.required("Campo obrigatório."),
        }),
      },

      {
        inputKey: "Era utilizado algum maquinário na propriedade rural ?",
        type: "radio",
        defaultValue: "",
        label: "Era utilizado algum maquinário na propriedade rural ?",
        options: [{ value: "Sim" }, { value: "Não" }],
        isRequired: true,
        visible: {
          when: {
            inputKey: "nasceu_zona_rural",
            equals: "Sim",
          },
        },
        validation: yup.string().when("nasceu_zona_rural", {
          is: "Sim",
          then: (schema) => schema.required("Campo obrigatório."),
        }),
      },

      // Pergunta 10 aqui

      {
        inputKey:
          "Alguém da sua família trabalhou com registro na Carteira de Trabalho ?",
        type: "radio",
        defaultValue: "",
        label:
          "Alguém da sua família trabalhou com registro na Carteira de Trabalho ?",
        isRequired: true,
        visible: {
          when: {
            inputKey: "nasceu_zona_rural",
            equals: "Sim",
          },
        },
        options: [{ value: "Sim" }, { value: "Não" }],
        validation: yup.string().when("nasceu_zona_rural", {
          is: "Sim",
          then: (schema) => schema.required("Campo obrigatório."),
        }),
      },

      {
        inputKey: "Quem e quando ?",
        type: "text",
        defaultValue: "",
        label: "Quem e quando ?",
        isRequired: true,
        visible: {
          when: {
            inputKey:
              "Alguém da sua família trabalhou com registro na Carteira de Trabalho ?",
            equals: "Sim",
          },
        },
        validation: yup.string().when("nasceu_zona_rural", {
          is: "Sim",
          then: (schema) => schema.required("Campo obrigatório."),
        }),
      },

      {
        inputKey: "Quantos irmãos o autor teve ?",
        type: "textarea",
        defaultValue: "",
        label:
          "Quantos irmãos o autor teve ? Número de irmãos, qual posição (1º, 2º, ... filho).",
        isRequired: true,
        visible: {
          when: {
            inputKey: "nasceu_zona_rural",
            equals: "Sim",
          },
        },
        validation: yup.string().when("nasceu_zona_rural", {
          is: "Sim",
          then: (schema) => schema.required("Campo obrigatório."),
        }),
      },

      {
        inputKey: "Fez escola rural ?",
        type: "radio",
        defaultValue: "",
        label: "Fez escola rural ?",
        isRequired: true,
        visible: {
          when: {
            inputKey: "nasceu_zona_rural",
            equals: "Sim",
          },
        },
        options: [{ value: "Sim" }, { value: "Não" }],
        validation: yup.string().when("nasceu_zona_rural", {
          is: "Sim",
          then: (schema) => schema.required("Campo obrigatório."),
        }),
      },

      {
        inputKey: "Adotavam o sistema de troca de dia ?",
        type: "radio",
        defaultValue: "",
        label: "Adotavam o sistema de troca de dia ?",
        isRequired: true,
        visible: {
          when: {
            inputKey: "nasceu_zona_rural",
            equals: "Sim",
          },
        },
        options: [{ value: "Sim" }, { value: "Não" }],
        validation: yup.string().when("nasceu_zona_rural", {
          is: "Sim",
          then: (schema) => schema.required("Campo obrigatório."),
        }),
      },

      {
        inputKey:
          "Frequentou algum hospital ou posto de saúde na zona rural em que possua cadastro ?",
        type: "radio",
        defaultValue: "",
        label:
          "Frequentou algum hospital ou posto de saúde na zona rural em que possua cadastro ?",
        isRequired: true,
        visible: {
          when: {
            inputKey: "nasceu_zona_rural",
            equals: "Sim",
          },
        },
        options: [{ value: "Sim" }, { value: "Não" }],
        validation: yup.string().when("nasceu_zona_rural", {
          is: "Sim",
          then: (schema) => schema.required("Campo obrigatório."),
        }),
      },

      {
        inputKey:
          "Se homem, tem o certificado de reservista original ou declaração equivalente ?",
        type: "radio",
        defaultValue: "",
        label:
          "Se homem, tem o certificado de reservista original ou declaração equivalente ?",
        isRequired: false,
        visible: {
          when: {
            inputKey: "nasceu_zona_rural",
            equals: "Sim",
          },
        },
        options: [{ value: "Sim" }, { value: "Não" }],
        validation: yup.string(),
      },

      {
        inputKey: "Casou na zonal rural ?",
        type: "radio",
        defaultValue: "",
        label: "Casou na zonal rural ?",
        isRequired: true,
        visible: {
          when: {
            inputKey: "nasceu_zona_rural",
            equals: "Sim",
          },
        },
        options: [{ value: "Sim" }, { value: "Não" }],
        validation: yup.string().when("nasceu_zona_rural", {
          is: "Sim",
          then: (schema) => schema.required("Campo obrigatório."),
        }),
      },

      {
        inputKey:
          "Tem notas fiscais ou equivalentes sobre a aquisição de insumos ou venda de produtos ?",
        type: "radio",
        defaultValue: "",
        label:
          "Tem notas fiscais ou equivalentes sobre a aquisição de insumos ou venda de produtos ?",
        isRequired: true,
        visible: {
          when: {
            inputKey: "nasceu_zona_rural",
            equals: "Sim",
          },
        },
        options: [{ value: "Sim" }, { value: "Não" }],
        validation: yup.string().when("nasceu_zona_rural", {
          is: "Sim",
          then: (schema) => schema.required("Campo obrigatório."),
        }),
      },

      {
        inputKey: "Tem certidão do INCRA ?",
        type: "radio",
        defaultValue: "",
        label: "Tem certidão do INCRA ?",
        isRequired: true,
        visible: {
          when: {
            inputKey: "nasceu_zona_rural",
            equals: "Sim",
          },
        },
        options: [{ value: "Sim" }, { value: "Não" }],
        validation: yup.string().when("nasceu_zona_rural", {
          is: "Sim",
          then: (schema) => schema.required("Campo obrigatório."),
        }),
      },

      {
        inputKey: "Tem registro de imóveis da terra ?",
        type: "radio",
        defaultValue: "",
        label: "Tem registro de imóveis da terra ?",
        isRequired: true,
        visible: {
          when: {
            inputKey: "nasceu_zona_rural",
            equals: "Sim",
          },
        },
        options: [{ value: "Sim" }, { value: "Não" }],
        validation: yup.string().when("nasceu_zona_rural", {
          is: "Sim",
          then: (schema) => schema.required("Campo obrigatório."),
        }),
      },

      {
        inputKey: "A terra tem outros proprietários (condôminos) ?",
        type: "radio",
        defaultValue: "",
        label: "A terra tem outros proprietários (condôminos) ?",
        isRequired: true,
        visible: {
          when: {
            inputKey: "nasceu_zona_rural",
            equals: "Sim",
          },
        },
        options: [{ value: "Sim" }, { value: "Não" }],
        validation: yup.string().when("nasceu_zona_rural", {
          is: "Sim",
          then: (schema) => schema.required("Campo obrigatório."),
        }),
      },

      {
        inputKey:
          "Os pais, irmãos ou seu esposo (a) contaram tempo rural para se aposentarem ?",
        type: "radio",
        defaultValue: "",
        label:
          "Os pais, irmãos ou seu esposo (a) contaram tempo rural para se aposentarem ?",
        isRequired: true,
        visible: {
          when: {
            inputKey: "nasceu_zona_rural",
            equals: "Sim",
          },
        },
        options: [{ value: "Sim" }, { value: "Não" }],
        validation: yup.string().when("nasceu_zona_rural", {
          is: "Sim",
          then: (schema) => schema.required("Campo obrigatório."),
        }),
      },

      {
        inputKey:
          "Há testemunhas ? Elas podem comprovar todo o tempo ou confirmariam períodos distintos ?",
        type: "radio",
        defaultValue: "",
        label:
          "Há testemunhas ? Elas podem comprovar todo o tempo ou confirmariam períodos distintos ?",
        isRequired: true,
        visible: {
          when: {
            inputKey: "nasceu_zona_rural",
            equals: "Sim",
          },
        },
        options: [{ value: "Sim" }, { value: "Não" }],
        validation: yup.string().when("nasceu_zona_rural", {
          is: "Sim",
          then: (schema) => schema.required("Campo obrigatório."),
        }),
      },
    ],
  },

  {
    title:
      "Prezado cliente, solicitamos o preenchimento desta ficha para otimizar seu atendimento.",
    subtitle:
      "Destacamos que outros questionamentos lhe serão feitos por ocasião de sua consulta.",
    inputs: [],
  },
];

export const FormsPages: FormPageType[] = [...save];

const inputs = FormsPages.map((form) => form.inputs)
  .flat()
  .map((input) => [input.inputKey, input.validation]);

const schema = Object.fromEntries(inputs);

export const FormsSchema = yup.object(schema);

//{
//  nasceu_zona_rural: yup.string().required("É obrigatório"),
//  quando_trabalhou_zona_rural: yup.string().when("nasceu_zona_rural", {
//    is: "Sim",
//    then: (schema) => schema.required(),
//  }),
//}
