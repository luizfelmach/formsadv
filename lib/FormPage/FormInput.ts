import { CommonInputType, InputType, OptionsType } from "@/types";
import * as yup from "yup";

//export type CommonInputType = {
//    inputKey: string;
//    type: "text" | "date" | "number" | "textarea" | "radio" | "checkbox";
//    label?: string;
//    placeholder?: string;
//    isRequired?: boolean;
//    defaultValue: any;
//    options?: OptionsType[];
//    visible?: {
//      when: {
//        inputKey: string;
//        equals: string;
//      };
//    };
//    validation: yup.AnySchema;
//  };

export class FormInput {
  private result: CommonInputType;

  constructor(type: InputType) {
    this.result = {
      type: type,
      inputKey: "invalid-key",
      defaultValue: "invalid-default-value",
      validation: yup.string(),
    };
  }

  key(key: string) {
    this.result.inputKey = key;
    return this;
  }

  label(label: string) {
    this.result.label = label;
    return this;
  }

  placeholder(placeholder: string) {
    this.result.placeholder = placeholder;
    return this;
  }

  defaultValue(defaultValue: any) {
    this.result.defaultValue = defaultValue;
    return this;
  }

  options(options: OptionsType[]) {
    this.result.options = options;
    return this;
  }

  visible(visible: { when: { inputKey: string; equals: string } }) {
    this.result.visible = visible;
    return this;
  }

  required() {
    this.result.isRequired = true;
    return this;
  }

  build(): CommonInputType {
    const { type, isRequired, visible } = this.result;
    if (type === "checkbox") {
      this.result.validation = yup.array(yup.string());
    }
    if (type === "date") {
      this.result.validation = yup.date();
    }
    if (type === "number") {
      this.result.validation = yup.number();
    }
    if (type === "radio") {
      this.result.validation = yup.string();
    }
    if (type === "text") {
      this.result.validation = yup.string();
    }
    if (type === "textarea") {
      this.result.validation = yup.string();
    }

    if (isRequired) {
      if (type === "date") {
        this.result.validation = this.result.validation
          .required("Campo obrigatório.")
          .typeError("Forneça uma data.");
      } else if (type === "checkbox") {
        this.result.validation = (
          this.result.validation as yup.NumberSchema
        ).min(1, "Campo obrigatório.");
      } else {
        this.result.validation =
          this.result.validation.required("Campo obrigatório.");
      }
    }

    if (visible && isRequired) {
      this.result.validation = this.result.validation.when(
        visible.when.inputKey,
        {
          is: visible.when.equals,
          then: (schema) => schema.required("Campo obrigatório."),
        }
      );
    }

    return this.result;
  }
}

export const InputBuilder = {
  type: (type: InputType) => {
    return new FormInput(type);
  },
};
