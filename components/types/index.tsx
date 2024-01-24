export type ScreenTypesUnion =
  | "text"
  | "textarea"
  | "number"
  | "date"
  | "checkbox"
  | "radio"
  | "statement"
  | "end";

export type QueryType = "equals";

export type ScreenType = {
  screenKey: string;
  type: ScreenTypesUnion;
  title: string;
  description?: string;
  options: string[];
  required?: boolean;
  cpf?: boolean;
  email?: boolean;
  visible?: {
    screenKey: string;
    query: QueryType;
    value: any;
  };
};

export type FormType = {
  screens: ScreenType[];
};
