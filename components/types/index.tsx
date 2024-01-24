type ScreenTypesUnion =
  | "text"
  | "textarea"
  | "number"
  | "date"
  | "checkbox"
  | "radio"
  | "statement"
  | "end";

export type ScreenType = {
  screenKey: string;
  type: ScreenTypesUnion;
  title: string;
  description?: string;
  options: string[];
  required?: boolean;
};

export type FormType = {
  screens: ScreenType[];
};
