import { FormPageEntity } from "@/types";
import { generateId } from "@/lib/utils";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Meu Form",
  description: "Crie formulários personalizados.",
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
    title: "Demandas previdenciárias.",
    subtitle:
      "Prezado cliente, visando a melhor eficiência de seu atendimento solicitamos o preenchimento do presente formulário.",
    inputs: [
      {
        inputKey: generateId(),
        type: "radio",
        label: "Se homem, serviu o exército ?",
        defaultValue: "",
        options: ["Sim", "Não"],
      },
      {
        inputKey: generateId("escola_tecnica"),
        type: "radio",
        label: "Fez escola técnica ?",
        defaultValue: "",
        options: ["Sim", "Não"],
      },
      {
        inputKey: generateId(),
        type: "radio",
        label: "Foi aluno aprendiz ?",
        defaultValue: "",
        options: ["Sim", "Não"],
        visible: {
          when: {
            inputKey: generateId("escola_tecnica"),
            equals: "Sim",
          },
        },
      },
      {
        inputKey: generateId("estatuario"),
        type: "radio",
        label: "Exerceu algum período de Serviço Público como estatutário ?",
        defaultValue: "",
        options: ["Sim", "Não"],
      },
      {
        inputKey: generateId(),
        type: "radio",
        label: "Há certidão por tempo de contribuição ?",
        defaultValue: "",
        options: ["Sim", "Não"],
        visible: {
          when: {
            inputKey: generateId("estatuario"),
            equals: "Sim",
          },
        },
      },
      {
        inputKey: generateId("atividade_especial"),
        type: "radio",
        label:
          "Esteve sujeito a algum risco à saúde ou integridade física em sua profissão (atividade especial) ?",
        defaultValue: "",
        options: ["Sim", "Não"],
      },
      {
        inputKey: generateId(),
        type: "text",
        label: "Quais ?",
        defaultValue: "",
        visible: {
          when: {
            inputKey: generateId("atividade_especial"),
            equals: "Sim",
          },
        },
      },

      {
        inputKey: generateId(),
        type: "checkbox",
        label: "Possui algum desses documentos ?",
        defaultValue: [],
        options: [
          {
            value: "SB40",
            description:
              "Formulários concedidos pela empresa p/ comprovar exposição ao risco.",
          },
          {
            value: "DSS8030",
            description:
              "Formulários concedidos pela empresa p/ comprovar exposição ao risco.",
          },
          {
            value: "DIRBEN8030",
            description:
              "Formulários concedidos pela empresa p/ comprovar exposição ao risco.",
          },
          {
            value: "LTCAT",
            description:
              "Laudo Técnico Condições Ambientais de Trabalho. Gerado na empresa sobre ambiente do trabalho.",
          },
          "PPRA",
          {
            value: "PPP",
            description:
              "Perfil Psicográfico Previdenciário. Emitido pelo RH da empresa. Indica se houve exposição a: Agentes nocivos ou físicos, Atividades insalubres, penosas ou perigosas. ",
          },
        ],
        visible: {
          when: {
            inputKey: generateId("atividade_especial"),
            equals: "Sim",
          },
        },
      },
      {
        inputKey: generateId(),
        type: "radio",
        label: "Possui colega de trabalho que já conseguiu tempo especial?",
        defaultValue: "",
        options: ["Sim", "Não"],
        visible: {
          when: {
            inputKey: generateId("atividade_especial"),
            equals: "Sim",
          },
        },
      },

      {
        inputKey: generateId("trabalho_autonomo"),
        type: "radio",
        label: "Já trabalhou como autônomo? Contribuinte individual ?",
        defaultValue: "",
        options: ["Sim", "Não"],
      },

      {
        inputKey: generateId(),
        type: "text",
        label: "Por quanto tempo ?",
        defaultValue: "",
        visible: {
          when: {
            inputKey: generateId("trabalho_autonomo"),
            equals: "Sim",
          },
        },
      },

      {
        inputKey: generateId(),
        type: "radio",
        label:
          "Possui alvará, contrato social, NFs, recibos, GFIP, fotos ou outros documentos que comprovam este trabalho ?",
        defaultValue: "",
        options: ["Sim", "Não"],
        visible: {
          when: {
            inputKey: generateId("trabalho_autonomo"),
            equals: "Sim",
          },
        },
      },

      {
        inputKey: generateId("beneficio_previdenciario"),
        type: "radio",
        label: "Já recebeu ou pediu benefício previdenciário ?",
        defaultValue: "",
        options: ["Sim", "Não"],
      },

      {
        inputKey: generateId(),
        type: "radio",
        label: "Possui a cópia do processo administrativo ?",
        defaultValue: "",
        options: ["Sim", "Não"],
        visible: {
          when: {
            inputKey: generateId("beneficio_previdenciario"),
            equals: "Sim",
          },
        },
      },

      {
        inputKey: generateId(),
        type: "radio",
        label: "Já moveu processo judicial trabalhista contra alguém ?",
        defaultValue: "",
        options: ["Sim", "Não"],
      },

      {
        inputKey: generateId(),
        type: "radio",
        label: "Já teve processo judicial previdenciário ?",
        defaultValue: "",
        options: ["Sim", "Não"],
      },

      {
        inputKey: generateId("trabalhou_fora_do_brasil"),
        type: "radio",
        label: "Trabalhou fora do Brasil ?",
        defaultValue: "",
        options: ["Sim", "Não"],
      },

      {
        inputKey: generateId(),
        type: "textarea",
        defaultValue: "",
        label: "Em qual país ? Quando ?",
        visible: {
          when: {
            inputKey: generateId("trabalhou_fora_do_brasil"),
            equals: "Sim",
          },
        },
      },
      {
        inputKey: generateId(),
        type: "radio",
        defaultValue: "",
        label: "Possui provas ? Possui passaporte ?",
        options: ["Sim", "Não"],
        visible: {
          when: {
            inputKey: generateId("trabalhou_fora_do_brasil"),
            equals: "Sim",
          },
        },
      },

      {
        inputKey: generateId(),
        type: "radio",
        label: "Já recolheu contribuição em carnê (GPS) ?",
        defaultValue: "",
        options: ["Sim", "Não"],
      },

      {
        inputKey: generateId(),
        type: "radio",
        label:
          "Sofreu ou sofre de doença que inviabilize ou dificulte o trabalho ?",
        defaultValue: "",
        options: ["Sim", "Não"],
      },

      {
        inputKey: generateId(),
        type: "radio",
        label: "Já trabalhou na condição de pessoa com deficiência ?",
        defaultValue: "",
        options: ["Sim", "Não"],
      },

      {
        inputKey: generateId("previdencia_complementar"),
        type: "radio",
        label: "Possui previdência complementar ?",
        defaultValue: "",
        options: ["Sim", "Não"],
      },

      {
        inputKey: generateId(),
        type: "text",
        label: "Qual ?",
        defaultValue: "",
        visible: {
          when: {
            inputKey: generateId("previdencia_complementar"),
            equals: "Sim",
          },
        },
      },

      {
        inputKey: generateId(),
        type: "radio",
        label: "O plano é vinculado à empresa em que trabalha(ou) ?",
        defaultValue: "",
        options: ["Sim", "Não"],
        visible: {
          when: {
            inputKey: generateId("previdencia_complementar"),
            equals: "Sim",
          },
        },
      },

      {
        inputKey: generateId(),
        type: "radio",
        label: "Teve contrato de experiência ?",
        defaultValue: "",
        options: ["Sim", "Não"],
      },

      {
        inputKey: generateId("vinculado_sindicato"),
        type: "radio",
        label: "Encontra-se vinculado a algum sindicato ?",
        defaultValue: "",
        options: ["Sim", "Não"],
      },

      {
        inputKey: generateId(),
        type: "text",
        label: "Qual sindicato ?",
        defaultValue: "",
        visible: {
          when: {
            inputKey: generateId("vinculado_sindicato"),
            equals: "Sim",
          },
        },
      },

      {
        inputKey: generateId(),
        type: "radio",
        label: "Já efetuou saque de FGTS ?",
        defaultValue: "",
        options: ["Sim", "Não"],
      },

      {
        inputKey: generateId("cargo_professor"),
        type: "radio",
        label: "Já exerceu cargo de professor ?",
        defaultValue: "",
        options: ["Sim", "Não"],
      },

      {
        inputKey: generateId(),
        type: "text",
        label: "Por qual período ?",
        defaultValue: "",
        visible: {
          when: {
            inputKey: generateId("cargo_professor"),
            equals: "Sim",
          },
        },
      },

      {
        inputKey: generateId(),
        type: "checkbox",
        label: "Quais áreas ?",
        defaultValue: [],
        options: [
          "Educação infantil",
          "Ensino fundamental",
          "Ensino médio",
          "Superior",
          "Pós graduação",
        ],
        visible: {
          when: {
            inputKey: generateId("cargo_professor"),
            equals: "Sim",
          },
        },
      },

      {
        inputKey: generateId(),
        type: "radio",
        label: "Exerceu cargo de direção escolar ?",
        defaultValue: "",
        options: ["Sim", "Não"],
        visible: {
          when: {
            inputKey: generateId("cargo_professor"),
            equals: "Sim",
          },
        },
      },

      {
        inputKey: generateId(),
        type: "radio",
        label: "Exerceu atividade de coordenação ?",
        defaultValue: "",
        options: ["Sim", "Não"],
        visible: {
          when: {
            inputKey: generateId("cargo_professor"),
            equals: "Sim",
          },
        },
      },

      {
        inputKey: generateId(),
        type: "radio",
        label: "Exerceu cargo de assessoramento pedagógico ?",
        defaultValue: "",
        options: ["Sim", "Não"],
        visible: {
          when: {
            inputKey: generateId("cargo_professor"),
            equals: "Sim",
          },
        },
      },

      {
        inputKey: generateId(),
        type: "radio",
        label:
          "Já se afastou da atividade em razão do recebimento de benefício por incapacidade entre períodos de magistério ?",
        defaultValue: "",
        options: ["Sim", "Não"],
        visible: {
          when: {
            inputKey: generateId("cargo_professor"),
            equals: "Sim",
          },
        },
      },

      {
        inputKey: generateId(),
        type: "radio",
        label:
          "Já se afastou da atividade em razão do recebimento de benefício por incapacidade decorrente de acidente de trabalho, intercalado ou não entre períodos de magistério ?",
        defaultValue: "",
        options: ["Sim", "Não"],
        visible: {
          when: {
            inputKey: generateId("cargo_professor"),
            equals: "Sim",
          },
        },
      },

      {
        inputKey: generateId(),
        type: "radio",
        label: "Recebeu licença prêmio no vínculo de professor ?",
        defaultValue: "",
        options: ["Sim", "Não"],
        visible: {
          when: {
            inputKey: generateId("cargo_professor"),
            equals: "Sim",
          },
        },
      },

      {
        inputKey: generateId(),
        type: "radio",
        label:
          "Já exerceu cargo de professor auxiliar exercendo atividade de docente nas mesmas condições do titular ?",
        defaultValue: "",
        options: ["Sim", "Não"],
        visible: {
          when: {
            inputKey: generateId("cargo_professor"),
            equals: "Sim",
          },
        },
      },

      {
        inputKey: generateId(),
        type: "radio",
        label:
          "Recebe ou recebeu Pensão por Morte ou aposentadoria em outro regime de previdência ?",
        defaultValue: "",
        options: ["Sim", "Não"],
      },

      {
        inputKey: generateId(),
        type: "radio",
        label:
          "Recebe benefício de Pensão por Morte ou aposentadoria no INSS ?",
        defaultValue: "",
        options: ["Sim", "Não"],
      },
    ],
  },

  {
    title: "Atividade em zona rural.",
    subtitle:
      "Prezado cliente, visando a melhor eficiência de seu atendimento solicitamos o preenchimento do presente formulário.",
    inputs: [
      {
        inputKey: generateId("nasceu_zona_rural"),
        type: "radio",
        label: "Nasceu em zona rural ?",
        required: true,
        defaultValue: "",
        options: ["Sim", "Não"],
      },
      {
        inputKey: generateId(),
        type: "text",
        label: "Quando trabalhou no meio rural ?",
        defaultValue: "",
        visible: {
          when: {
            inputKey: generateId("nasceu_zona_rural"),
            equals: "Sim",
          },
        },
      },

      {
        inputKey: generateId(),
        type: "text",
        label: "Onde era a propriedade rural ?",
        defaultValue: "",
        visible: {
          when: {
            inputKey: generateId("nasceu_zona_rural"),
            equals: "Sim",
          },
        },
      },

      {
        inputKey: generateId("terra_dos_pais"),
        type: "radio",
        label: "A terra era dos pais ?",
        defaultValue: "",
        options: ["Sim", "Não"],
        visible: {
          when: {
            inputKey: generateId("nasceu_zona_rural"),
            equals: "Sim",
          },
        },
      },

      {
        inputKey: generateId(),
        type: "text",
        defaultValue: "",
        label: "Eram arrendadas, meação, comodato ou outro sistema ?",
        visible: {
          when: {
            inputKey: generateId("terra_dos_pais"),
            equals: "Não",
          },
        },
      },

      {
        inputKey: generateId(),
        type: "text",
        defaultValue: "",
        label: "De quem era a propriedade rural ?",
        visible: {
          when: {
            inputKey: generateId("terra_dos_pais"),
            equals: "Não",
          },
        },
      },

      {
        inputKey: generateId(),
        label: "Possui contratos de Parceria/Comodato ou Declarações ?",
        type: "radio",
        defaultValue: "",
        options: ["Sim", "Não"],
        visible: {
          when: {
            inputKey: generateId("nasceu_zona_rural"),
            equals: "Sim",
          },
        },
      },

      {
        inputKey: generateId("se_afastou_atividade_rural"),
        type: "radio",
        defaultValue: "",
        label: "Já se afastou da atividade rural ?",
        options: ["Sim", "Não"],
        visible: {
          when: {
            inputKey: generateId("nasceu_zona_rural"),
            equals: "Sim",
          },
        },
      },

      {
        inputKey: generateId(),
        type: "text",
        defaultValue: "",
        label: "Por que e por quanto tempo ?",
        visible: {
          when: {
            inputKey: generateId("se_afastou_atividade_rural"),
            equals: "Sim",
          },
        },
      },

      {
        inputKey: generateId(),
        type: "text",
        defaultValue: "",
        label:
          "Quantas pessoas da sua família trabalhavam nesta propriedade rural ?",
        visible: {
          when: {
            inputKey: generateId("nasceu_zona_rural"),
            equals: "Sim",
          },
        },
      },

      {
        inputKey: generateId(),
        type: "textarea",
        defaultValue: "",
        label:
          "Qual era o tamanho das terras? Quanto deste espaço era utilizado para plantio ou criação de animais ?",
        visible: {
          when: {
            inputKey: generateId(),
            equals: "Sim",
          },
        },
      },

      {
        inputKey: generateId(),
        type: "textarea",
        defaultValue: "",
        label:
          "O que era plantado e criado na propriedade rural ? Quantidade ?",
        visible: {
          when: {
            inputKey: generateId("nasceu_zona_rural"),
            equals: "Sim",
          },
        },
      },

      {
        inputKey: generateId(),
        type: "text",
        defaultValue: "",
        label: "Qual a quantidade anual da colheita ?",
        visible: {
          when: {
            inputKey: generateId("nasceu_zona_rural"),
            equals: "Sim",
          },
        },
      },

      {
        inputKey: generateId(),
        type: "text",
        defaultValue: "",
        label: "Quantos empregados ou meeiros tinham na propriedade rural ?",
        visible: {
          when: {
            inputKey: generateId("nasceu_zona_rural"),
            equals: "Sim",
          },
        },
      },

      {
        inputKey: generateId(),
        type: "radio",
        defaultValue: "",
        label: "Era utilizado algum maquinário na propriedade rural ?",
        options: ["Sim", "Não"],
        visible: {
          when: {
            inputKey: generateId("nasceu_zona_rural"),
            equals: "Sim",
          },
        },
      },

      {
        inputKey: generateId("familia_registro_ctps"),
        type: "radio",
        defaultValue: "",
        label:
          "Alguém da sua família trabalhou com registro na Carteira de Trabalho ?",
        visible: {
          when: {
            inputKey: generateId("nasceu_zona_rural"),
            equals: "Sim",
          },
        },
        options: ["Sim", "Não"],
      },

      {
        inputKey: "Quem e quando ?",
        type: "text",
        defaultValue: "",
        label: "Quem e quando ?",
        visible: {
          when: {
            inputKey: generateId("familia_registro_ctps"),
            equals: "Sim",
          },
        },
      },

      {
        inputKey: generateId(),
        type: "textarea",
        defaultValue: "",
        label: "Quantos irmãos teve ?",
        visible: {
          when: {
            inputKey: generateId("nasceu_zona_rural"),
            equals: "Sim",
          },
        },
      },

      {
        inputKey: generateId(),
        type: "radio",
        defaultValue: "",
        label: "Fez escola rural ?",
        visible: {
          when: {
            inputKey: generateId("nasceu_zona_rural"),
            equals: "Sim",
          },
        },
        options: ["Sim", "Não"],
      },

      {
        inputKey: generateId(),
        type: "radio",
        defaultValue: "",
        label: "Adotavam o sistema de troca de dia ?",
        visible: {
          when: {
            inputKey: generateId("nasceu_zona_rural"),
            equals: "Sim",
          },
        },
        options: ["Sim", "Não"],
      },

      {
        inputKey: generateId(),
        type: "radio",
        defaultValue: "",
        label:
          "Frequentou algum hospital ou posto de saúde na zona rural em que possua cadastro ?",
        visible: {
          when: {
            inputKey: generateId("nasceu_zona_rural"),
            equals: "Sim",
          },
        },
        options: ["Sim", "Não"],
      },

      {
        inputKey: generateId(),
        type: "radio",
        defaultValue: "",
        options: ["Sim", "Não"],
        label:
          "Se homem, tem o certificado de reservista original ou declaração equivalente ?",
        visible: {
          when: {
            inputKey: generateId("nasceu_zona_rural"),
            equals: "Sim",
          },
        },
      },

      {
        inputKey: generateId(),
        type: "radio",
        options: ["Sim", "Não"],
        defaultValue: "",
        label: "Casou na zonal rural ?",
        visible: {
          when: {
            inputKey: generateId("nasceu_zona_rural"),
            equals: "Sim",
          },
        },
      },

      {
        inputKey: generateId(),
        type: "radio",
        defaultValue: "",
        label:
          "Tem notas fiscais ou equivalentes sobre a aquisição de insumos ou venda de produtos ?",
        visible: {
          when: {
            inputKey: generateId("nasceu_zona_rural"),
            equals: "Sim",
          },
        },
        options: ["Sim", "Não"],
      },

      {
        inputKey: generateId(),
        type: "radio",
        defaultValue: "",
        label: "Tem certidão do INCRA ?",
        visible: {
          when: {
            inputKey: generateId("nasceu_zona_rural"),
            equals: "Sim",
          },
        },
        options: ["Sim", "Não"],
      },

      {
        inputKey: generateId(),
        type: "radio",
        defaultValue: "",
        label: "Tem registro de imóveis da terra ?",
        visible: {
          when: {
            inputKey: generateId("nasceu_zona_rural"),
            equals: "Sim",
          },
        },
        options: ["Sim", "Não"],
      },

      {
        inputKey: generateId(),
        type: "radio",
        defaultValue: "",
        label: "A terra tem outros proprietários (condôminos) ?",
        visible: {
          when: {
            inputKey: generateId("nasceu_zona_rural"),
            equals: "Sim",
          },
        },
        options: ["Sim", "Não"],
      },

      {
        inputKey: generateId(),
        type: "radio",
        defaultValue: "",
        label:
          "Os pais, irmãos ou seu esposo (a) contaram tempo rural para se aposentarem ?",
        visible: {
          when: {
            inputKey: generateId("nasceu_zona_rural"),
            equals: "Sim",
          },
        },
        options: ["Sim", "Não"],
      },

      {
        inputKey: generateId(),
        type: "radio",
        defaultValue: "",
        label:
          "Há testemunhas ? Elas podem comprovar todo o tempo ou confirmariam períodos distintos ?",
        visible: {
          when: {
            inputKey: generateId("nasceu_zona_rural"),
            equals: "Sim",
          },
        },
        options: ["Sim", "Não"],
      },
    ],
  },

  {
    title: "Benefício por incapacidade.",
    subtitle:
      "Prezado cliente, visando a melhor eficiência de seu atendimento solicitamos o preenchimento do presente formulário.",
    inputs: [
      {
        inputKey: generateId(),
        type: "radio",
        label: "Você está trabalhando no momento ?",
        defaultValue: "",
        options: ["Sim", "Não"],
      },
      {
        inputKey: generateId(),
        type: "text",
        label: "Qual era sua atividade habitual/trabalho ?",
        defaultValue: "",
      },

      {
        inputKey: generateId(),
        type: "textarea",
        label: "Quais atividades eram realizadas? Descrever resumidamente.",
        defaultValue: "",
      },

      {
        inputKey: generateId(),
        type: "textarea",
        label:
          "Quando ficou incapacitado para o trabalho/atividade habitual e, de que maneira as doenças lhe impossibilitam o trabalho ?",
        defaultValue: "",
      },
      {
        inputKey: generateId(),
        type: "radio",
        label: "Como era recolhido o INSS ?",
        defaultValue: "",
        options: ["Pelo empregador", "Por mim"],
      },

      {
        inputKey: generateId(),
        type: "text",
        label: "Quando foi vertida a última contribuição para o INSS ?",
        defaultValue: "",
      },

      {
        inputKey: generateId(),
        type: "textarea",
        label:
          "Quais são as doenças que lhe acometem, mesmo que não seja incapacitante? Em que ano iniciaram ?",
        defaultValue: "",
      },

      {
        inputKey: generateId(),
        type: "checkbox",
        label: "Você recebe ou recebeu algum desses benefícios ?",
        defaultValue: [],
        options: [
          "Aposentadoria",
          "Pensão por morte",
          "Auxílio doença",
          "Salário-maternidade",
          "Amparo assistencial",
          "Não recebo ou não recebi nenhum",
        ],
      },

      {
        inputKey: generateId(),
        type: "text",
        label:
          'Caso a resposta "sim" no item anterior, qual o valor do benefício quando começou a receber, se lembrar, qual foi o último valor recebido quando da cessação',
        defaultValue: "",
      },

      {
        inputKey: generateId(),
        type: "text",
        label: "Quando o benefício acima foi concedido ?",
        defaultValue: "",
      },

      {
        inputKey: generateId(),
        type: "text",
        label: "Quando o benefício acima foi cessado ?",
        defaultValue: "",
      },

      {
        inputKey: generateId(),
        type: "radio",
        label:
          "O benefício recebido foi resultante de acidente de trabalho ou de doença ligada ao trabalho? Houve abertura de CAT?",
        defaultValue: "",
        options: ["Sim, houve CAT", "Sim, não houve abertura de CAT", "Não"],
      },

      {
        inputKey: generateId(),
        type: "checkbox",
        label: "Quais desses benefícios você já pediu no INSS ?",
        defaultValue: [],
        options: [
          "Aposentadoria",
          "Pensão por morte",
          "Auxílio doença",
          "Amparo assistencial",
          "Salário-maternidade",
          "Nunca pedi estes benefícios",
        ],
      },

      {
        inputKey: generateId(),
        type: "checkbox",
        label:
          "Já teve processo judicial para a concessão de algum desses benefícios ?",
        defaultValue: [],
        options: [
          "Aposentadoria",
          "Pensão por morte",
          "Auxílio doença",
          "Amparo assistencial",
          "Nunca entrei com processo contra o INSS",
        ],
      },

      {
        inputKey: generateId(),
        type: "radio",
        label: "Já teve processo trabalhista ?",
        defaultValue: "",
        options: ["Sim", "Não"],
      },

      {
        inputKey: generateId(),
        type: "textarea",
        label:
          "Quantas perícias já fez no INSS? Saberia informar o nº de benefício (NB) ?",
        defaultValue: "",
      },

      {
        inputKey: generateId(),
        type: "radio",
        label: "Vem realizando tratamento médico ?",
        defaultValue: "",
        options: ["Sim", "Não"],
      },

      {
        inputKey: generateId("documentacao_medica"),
        type: "radio",
        label: "Possui documentação médica recente ?",
        defaultValue: "",
        options: ["Sim", "Não"],
      },

      {
        inputKey: generateId(),
        type: "textarea",
        label: "Quais documentações médicas ?",
        defaultValue: "",
        visible: {
          when: {
            inputKey: generateId("documentacao_medica"),
            equals: "Sim",
          },
        },
      },
    ],
  },
];

export const FormsPages: FormPageEntity[] = [...save];
