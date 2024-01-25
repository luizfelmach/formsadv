export type ScreenTypesUnion =
  | "text"
  | "textarea"
  | "number"
  | "date"
  | "checkbox"
  | "radio"
  | "statement"
  | "end";

export type QueryType =
  | "equals"
  | "notEquals"
  | "contains"
  | "startsWith"
  | "endsWith"
  | "lt"
  | "gt"
  | "lte"
  | "gte"
  | "has";

export type ScreenVisibleQuery = {
  screenKey: string;
  screenType: ScreenTypesUnion;
  query: QueryType;
  value: any;
};

export type ScreenType = {
  screenKey: string;
  type: ScreenTypesUnion;
  title: string;
  description?: string;
  options: string[];
  required?: boolean;
  cpf?: boolean;
  email?: boolean;
  visible?: ScreenVisibleQuery[];
};

export type FormType = {
  screens: ScreenType[];
  endScreen: ScreenType;
};
