import * as yup from "yup";
import { ScreenType, ScreenTypesUnion } from "@/components/types";
import { cpf as cpfValidator } from "cpf-cnpj-validator";

type types = Exclude<ScreenTypesUnion, "end" | "statement">;

const typeSchema: Record<types, yup.AnySchema> = {
  text: yup.string(),
  date: yup.date(),
  checkbox: yup.array(yup.string()),
  number: yup.number(),
  radio: yup.string(),
  textarea: yup.string(),
};

function applyRequired(type: types, schema: yup.AnySchema): yup.AnySchema {
  if (type === "checkbox")
    return (
      schema as yup.ArraySchema<
        (string | undefined)[] | undefined,
        yup.AnyObject,
        undefined,
        ""
      >
    ).min(1, "Selecione pelo menos uma opção.");

  if (type === "date") {
    return (schema = schema
      .required("Campo obrigatório.")
      .typeError("Campo obrigatório."));
  }
  return schema.required("Campo obrigatório.");
}

function schemaFromScreen(screen: ScreenType): yup.AnySchema {
  const type = screen.type as types;
  const { cpf, required, email } = screen;
  let schema = typeSchema[type];

  if (required) {
    schema = applyRequired(type, schema);
  }

  if (email) {
    schema = (
      schema as yup.StringSchema<
        string | undefined,
        yup.AnyObject,
        undefined,
        ""
      >
    ).email("Campo deve ser um e-mail válido.");
  }

  if (cpf) {
    schema = schema.test("cpf-validate", "Forneça um CPF válido.", (value) => {
      if (value) {
        return cpfValidator.isValid(value);
      }
      return true;
    });
  }

  return schema;
}

export function createSchema(screens: ScreenType[]): yup.AnyObjectSchema {
  let screensToValidate = screens.filter(
    ({ type }) => type !== "statement" && type !== "end"
  );

  const entries = screensToValidate.map((screen) => [
    screen.screenKey,
    schemaFromScreen(screen),
  ]);
  const baseSchema = Object.fromEntries(entries);
  return yup.object(baseSchema);
}
