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
      equals: T;
    };
  };
};

type InputTextEntity = BaseInputEntity<string> & {
  type: "text";
};

type InputDateEntity = BaseInputEntity<Date | string> & {
  type: "date";
};

type InputNumberEntity = BaseInputEntity<number> & {
  type: "number";
};

type InputTextAreaEntity = BaseInputEntity<string> & {
  type: "textarea";
};

type InputRadioEntity = BaseInputEntity<string> & {
  type: "radio";
  options: OptionsType[];
};

type InputCheckBoxEntity = BaseInputEntity<string[]> & {
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
