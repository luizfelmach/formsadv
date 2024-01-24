import * as yup from "yup";
import { ScreenEntity } from ".";
import {
  ScreenType,
  ScreenTypesUnion,
  ScreenVisibleQuery,
} from "@/components/types";

export class ScreenDate implements ScreenEntity {
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
    let schema = yup.date();
    this.required && (schema = schema.required());

    return schema;
  }

  isVisible(answers: Record<string, any>) {
    return true;
  }
}
