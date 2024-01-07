import * as yup from "yup";

export type OptionsType = {
  value: string;
  description?: string;
};

export type CommonInputType = {
  inputKey: string;
  type: "text" | "date" | "number" | "textarea" | "radio" | "checkbox";
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  defaultValue: any;
  options?: OptionsType[];
  visible?: {
    when: {
      inputKey: string;
      equals: string;
    };
  };
  validation: yup.AnySchema;
};

export type FormPageType = {
  title: string;
  subtitle: string;
  inputs: CommonInputType[];
};
