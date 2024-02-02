import { createContext, useContext, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormType, ScreenType } from "@/types";

interface EditorContextProps {
  deleteScreen: (index: number) => void;
  setScreen: (index: number) => void;
  setEndScreen: () => void;
  currentScreen: ScreenType;
  currentScreenForm: string;
  screens: ScreenType[];
  endScreen: ScreenType;
}

const EditorContext = createContext<EditorContextProps | null>(null);

export function useEditor(): EditorContextProps | never {
  const context = useContext(EditorContext);
  if (!context) throw new Error("");
  return context;
}

interface EditorProviderProps {
  children?: React.ReactNode;
}

export function EditorProvider({ children }: EditorProviderProps) {
  const { control, watch } = useFormContext<FormType>();
  const { remove } = useFieldArray({ control, name: "screens" });
  const screens = watch("screens");
  const endScreen = watch("endScreen");
  const [currentScreenForm, setCurrentScreenForm] =
    useState<string>("screens.0");
  const currentScreen = watch(currentScreenForm as any);

  function setScreen(index: number) {
    setCurrentScreenForm(`screens.${index}`);
  }

  function setEndScreen() {
    setCurrentScreenForm(`endScreen`);
  }

  function deleteScreen(index: number) {
    if (index === 0) setScreen(0);
    else setScreen(index - 1);
    remove(index);
  }

  return (
    <EditorContext.Provider
      value={{
        currentScreen,
        currentScreenForm,
        deleteScreen,
        setScreen,
        setEndScreen,
        screens,
        endScreen,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}
