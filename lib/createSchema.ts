import * as yup from "yup";
import { InputEntity } from "@/types";

function schemaFromInput(input: InputEntity): yup.AnySchema {
  const { type, required, visible } = input;
  let schema: yup.AnySchema = yup.string();

  if (type === "text") {
    schema = yup.string();
  }
  if (type === "checkbox") {
    schema = yup.array(yup.string());
  }
  if (type === "date") {
    schema = yup.date();
  }
  if (type === "number") {
    schema = yup.number();
  }
  if (type === "radio") {
    schema = yup.string();
  }
  if (type === "text") {
    schema = yup.string();
  }
  if (type === "textarea") {
    schema = yup.string();
  }

  if (required) {
    if (type === "checkbox") {
      schema = (schema as yup.NumberSchema).min(1, "Campo obrigatório.");
    } else if (type === "date") {
      schema = schema
        .required("Campo obrigatório.")
        .typeError("Campo obrigatório.");
    } else {
      schema = schema.required("Campo obrigatório.");
    }
  }

  if (visible && required) {
    schema = schema.when(visible.when.inputKey, {
      is: visible.when.equals,
      then: (schema) => schema.required("Campo obrigatório."),
    });
  }

  return schema;
}

export function createSchema(inputs: InputEntity[]): yup.AnySchema {
  const entries = inputs.map((input) => [
    input.inputKey,
    schemaFromInput(input),
  ]);
  const baseSchema = Object.fromEntries(entries);
  return yup.object(baseSchema);
}
