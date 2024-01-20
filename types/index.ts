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

export type InputCheckBoxSingleEntity = BaseInputEntity<boolean> & {
  type: "checkboxSingle";
  options: OptionsType[];
};

export type InputSelectEntity = BaseInputEntity<string> & {
  type: "select";
  options: string[];
};

export type InputEntity =
  | InputTextEntity
  | InputDateEntity
  | InputNumberEntity
  | InputTextAreaEntity
  | InputRadioEntity
  | InputCheckBoxEntity
  | InputCheckBoxSingleEntity
  | InputSelectEntity;

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
  "checkboxSingle",
  "select",
] as const;
