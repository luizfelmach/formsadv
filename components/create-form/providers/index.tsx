import { createContext, useContext } from "react";
import { UseCreateFormsReturn } from "../hooks";

export const CreateFormContext = createContext<UseCreateFormsReturn | null>(
  null
);

export function useCreateFormContext(): UseCreateFormsReturn | never {
  const methods = useContext(CreateFormContext);
  if (!methods) throw new Error("Outside context.");
  return methods;
}
