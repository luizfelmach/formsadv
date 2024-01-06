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
  options?: OptionsType[];
  visible?: {
    when: {
      inputKey: string;
      equals: string;
    };
  };
};

export type FormPageType = {
  title: string;
  subtitle: string;
  inputs: CommonInputType[];
};
