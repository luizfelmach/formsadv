import * as yup from "yup";
import { ScreenEntity } from ".";
import { ScreenType, ScreenTypesUnion, ScreenVisibleQuery } from "@/types";
import { QueryValidateAnd } from "@/lib/query";
import { cpf as cpfValidator } from "cpf-cnpj-validator";

export class ScreenText implements ScreenEntity {
  type: ScreenTypesUnion;
  screenKey: string;
  title: string;
  description?: string;
  options: string[];
  required?: boolean;
  cpf?: boolean;
  email?: boolean;
  visible?: ScreenVisibleQuery[];

  constructor(screen: ScreenType) {
    this.type = screen.type;
    this.screenKey = screen.screenKey;
    this.title = screen.title;
    this.description = screen.description;
    this.options = screen.options;
    this.required = screen.required;
    this.cpf = screen.cpf;
    this.email = screen.email;
    this.visible = screen.visible;
  }
  getSchema() {
    let schema = yup.string();
    this.required && (schema = schema.required("Campo obrigatório."));
    this.email && (schema = schema.email("Informe um e-mail válido."));
    this.cpf &&
      (schema = schema.test(
        "cpf-validate",
        "Forneça um CPF válido.",
        (value) => {
          if (value) {
            return cpfValidator.isValid(value);
          }
          return true;
        }
      ));

    return schema;
  }

  isVisible(answers: Record<string, any>) {
    if (!this.visible) return true;
    return QueryValidateAnd(this.visible, answers);
  }
}
