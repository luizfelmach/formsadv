type OptionsWithDescriptionType = {
  value: string;
  description: string;
};

type OptionsType = OptionsWithDescriptionType | string;

type BaseInputEntity<T> = {
  inputKey: string;
  label: string;
  required?: boolean;
  defaultValue: T;
  visible?: {
    when: {
      inputKey: string;
      equals: string;
    };
  };
};

export type InputTextEntity = BaseInputEntity<string> & {
  type: "text";
  email?: boolean;
  cpf?: boolean;
};

export type InputDateEntity = BaseInputEntity<Date | string> & {
  type: "date";
};

export type InputNumberEntity = BaseInputEntity<number> & {
  type: "number";
};

export type InputTextAreaEntity = BaseInputEntity<string> & {
  type: "textarea";
};

export type InputRadioEntity = BaseInputEntity<string> & {
  type: "radio";
  options: OptionsType[];
};

export type InputCheckBoxEntity = BaseInputEntity<string[]> & {
  type: "checkbox";
  options: OptionsType[];
};

export type InputEntity =
  | InputTextEntity
  | InputDateEntity
  | InputNumberEntity
  | InputTextAreaEntity
  | InputRadioEntity
  | InputCheckBoxEntity;

export type FormPageEntity = {
  title: string;
  subtitle: string;
  inputs: InputEntity[];
};

export const InputsTypes = [
  "text",
  "date",
  "number",
  "textarea",
  "radio",
  "checkbox",
] as const;
