import { FormType, ScreenType } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { WatchObserver, useFieldArray, useFormContext } from "react-hook-form";

interface FormBuilderContextProps {
  deleteScreen: (index: number) => void;
  setScreen: (index: number) => void;
  setEndScreen: () => void;
  currentScreen: ScreenType | null;
  currentScreenForm: string;
  screens: ScreenType[];
  endScreen: ScreenType;
}

const FormBuilderContext = createContext<FormBuilderContextProps | null>(null);

export function useFormBuilder(): FormBuilderContextProps | never {
  const context = useContext(FormBuilderContext);
  if (!context) throw new Error("");
  return context;
}

interface FormBuilderProviderProps {
  children?: React.ReactNode;
}

export function FormBuilderProvider({ children }: FormBuilderProviderProps) {
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
    if (index === 0) setScreen(index + 1);
    else setScreen(index - 1);
    remove(index);
  }

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <FormBuilderContext.Provider
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
    </FormBuilderContext.Provider>
  );
}
