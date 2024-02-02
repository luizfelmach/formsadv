import { useState } from "react";
import { FormProvider, useFieldArray } from "react-hook-form";
import { FormType } from "@/types";
import { useFormEditor } from "./hooks/use-form-editor";
import { EditorContext } from "./hooks/use-editor";

interface EditorProviderProps {
  children?: React.ReactNode;
  form: FormType;
  handleSubmit: (data: FormType) => void;
}

export function EditorProvider(props: EditorProviderProps) {
  const { children, form, handleSubmit } = props;
  const methods = useFormEditor({ form });
  const { control, watch } = methods;
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
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>{children}</form>
      </FormProvider>
    </EditorContext.Provider>
  );
}
