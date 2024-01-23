export type ScreenType = {
  screenKey: string;
  type:
    | "text"
    | "textarea"
    | "number"
    | "date"
    | "checkbox"
    | "radio"
    | "statement"
    | "end";
  title: string;
  description?: string;
  options: string[];
};

export type FormType = {
  screens: ScreenType[];
};
