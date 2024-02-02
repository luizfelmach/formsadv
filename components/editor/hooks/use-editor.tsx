import { ScreenType } from "@/types";
import { createContext, useContext } from "react";

interface EditorContextProps {
  deleteScreen: (index: number) => void;
  setScreen: (index: number) => void;
  setEndScreen: () => void;
  currentScreen: ScreenType;
  currentScreenForm: string;
  screens: ScreenType[];
  endScreen: ScreenType;
}

export const EditorContext = createContext<EditorContextProps | null>(null);

export function useEditor(): EditorContextProps | never {
  const context = useContext(EditorContext);
  if (!context) throw new Error("");
  return context;
}
