import { FormType, ScreenType } from "@/components/types";
import { createContext, useContext, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

interface FormBuilderContextProps {
  deleteScreen: (screenKey: string) => void;
  setScreen: (screen: ScreenType) => void;
  currentScreen: ScreenType | null;
  screens: ScreenType[];
}

const FormBuilderContext = createContext<FormBuilderContextProps | null>(null);

export function useFormBuilder(): FormBuilderContextProps | never {
  const context = useContext(FormBuilderContext);
  if (!context) throw new Error("");
  return context;
}

export function FormBuilderProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [screen, setScreen] = useState<ScreenType | null>(null);

  const { control, watch } = useFormContext<FormType>();
  const { remove } = useFieldArray({
    control,
    name: "screens",
  });
  const screens = watch("screens") || [];

  function handleDeleteScreen(screenKey: string) {
    const index = screens.findIndex((e) => e.screenKey === screenKey);
    if (screens.length === 1) return;
    if (index < 0) return;
    if (index === 0) handleSetScreen(screens[index + 1]);
    else handleSetScreen(screens[index - 1]);
    remove(index);
  }

  function handleSetScreen(screen: ScreenType) {
    setScreen(screen || null);
  }

  return (
    <FormBuilderContext.Provider
      value={{
        currentScreen: screen,
        deleteScreen: handleDeleteScreen,
        setScreen: handleSetScreen,
        screens,
      }}
    >
      {children}
    </FormBuilderContext.Provider>
  );
}
