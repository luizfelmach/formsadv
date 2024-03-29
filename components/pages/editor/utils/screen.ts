import { v4 as uuid } from "uuid";
import { ScreenType } from "@/types";

export function createScreen(type: string): ScreenType {
  return {
    screenKey: uuid(),
    type: type as any,
    title: "Adicione sua pergunta aqui!",
    description: "Adicione também uma descrição.",
    options: ["Opção 1", "Opção 2", "Opção 3"],
    required: false,
    cpf: false,
    email: false,
    visible: [],
  };
}

export function duplicateScreen(screen: ScreenType): ScreenType {
  return {
    ...screen,
    screenKey: uuid(),
    title: screen.title + " (Cópia)",
  };
}
