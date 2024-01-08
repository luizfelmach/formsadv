import * as yup from "yup";
import {
  InputCheckBoxEntity,
  InputDateEntity,
  InputEntity,
  InputNumberEntity,
  InputRadioEntity,
  InputTextAreaEntity,
  InputTextEntity,
} from "@/types";
import { cpf as cpfValidator } from "cpf-cnpj-validator";

function schemaFromInputText(input: InputTextEntity): yup.AnySchema {
  const { required, visible, email, cpf } = input;
  let schema = yup.string();

  if (required && !visible) {
    schema = schema.required("Campo obrigatório.");
  }

  if (email) {
    schema = schema.email("Informe um e-mail válido.");
  }

  if (cpf) {
    schema = schema.test("cpf-validate", "Forneça um CPF válido.", (value) => {
      if (value) {
        return cpfValidator.isValid(value);
      }
      return true;
    });
  }

  if (visible && required) {
    schema = schema.when(visible.when.inputKey, {
      is: visible.when.equals,
      then: (schema) => schema.required("Campo obrigatório."),
    });
  }

  return schema;
}

function schemaFromInputTextArea(input: InputTextAreaEntity): yup.AnySchema {
  const { required, visible } = input;
  let schema = yup.string();

  if (required && !visible) {
    schema = schema.required("Campo obrigatório.");
  }

  if (visible && required) {
    schema = schema.when(visible.when.inputKey, {
      is: visible.when.equals,
      then: (schema) => schema.required("Campo obrigatório."),
    });
  }

  return schema;
}

function schemaFromInputNumber(input: InputNumberEntity): yup.AnySchema {
  const { required, visible } = input;
  let schema = yup.number();

  if (required && !visible) {
    schema = schema.required("Campo obrigatório.");
  }

  if (visible && required) {
    schema = schema.when(visible.when.inputKey, {
      is: visible.when.equals,
      then: (schema) => schema.required("Campo obrigatório."),
    });
  }

  return schema;
}

function schemaFromInputCheckBox(input: InputCheckBoxEntity): yup.AnySchema {
  const { required, visible } = input;
  let schema = yup.array(yup.string());

  if (required && !visible) {
    schema = schema.required("Campo obrigatório.").min(1, "Campo obrigatório.");
  }

  if (visible && required) {
    schema = schema.when(visible.when.inputKey, {
      is: visible.when.equals,
      then: (schema) =>
        schema.required("Campo obrigatório.").min(1, "Campo obrigatório."),
    });
  }

  return schema;
}

function schemaFromInputRadio(input: InputRadioEntity): yup.AnySchema {
  const { required, visible } = input;
  let schema = yup.string();

  if (required && !visible) {
    schema = schema.required("Campo obrigatório.");
  }

  if (visible && required) {
    schema = schema.when(visible.when.inputKey, {
      is: visible.when.equals,
      then: (schema) => schema.required("Campo obrigatório."),
    });
  }

  return schema;
}

function schemaFromInputDate(input: InputDateEntity) {
  const { required, visible } = input;
  let schema = yup.date();

  if (required && !visible) {
    schema = schema
      .required("Campo obrigatório.")
      .typeError("Campo obrigatório.");
  }

  if (visible && required) {
    schema = schema.when(visible.when.inputKey, {
      is: visible.when.equals,
      then: (schema) =>
        schema.required("Campo obrigatório.").typeError("Campo obrigatório."),
    });
  }

  return schema;
}

function schemaFromInput(input: InputEntity): yup.AnySchema {
  const { type } = input;
  if (type === "text") {
    return schemaFromInputText(input);
  }
  if (type === "textarea") {
    return schemaFromInputTextArea(input);
  }
  if (type === "number") {
    return schemaFromInputNumber(input);
  }
  if (type === "checkbox") {
    return schemaFromInputCheckBox(input);
  }
  if (type === "radio") {
    return schemaFromInputRadio(input);
  }
  if (type === "date") {
    return schemaFromInputDate(input);
  }
  return yup.string();
}

export function createSchema(inputs: InputEntity[]): yup.AnySchema {
  const entries = inputs.map((input) => [
    input.inputKey,
    schemaFromInput(input),
  ]);
  const baseSchema = Object.fromEntries(entries);
  return yup.object(baseSchema);
}
