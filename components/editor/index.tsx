"use client";

import { toast } from "sonner";
import { FormProvider } from "react-hook-form";
import { NavbarEditor } from "./components/navbar-editor";
import { EditorProvider } from "./provider";
import { EditorSection } from "./components/editor-section";
import { FormType } from "../../types";
import { UseFormEditor } from "./hook";

interface EditorProps {
  form: FormType;
}

export function Editor({ form }: EditorProps) {
  const methods = UseFormEditor({ form });

  async function handleSubmit(data: any) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
    toast.success("Formulário atualizado!");
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <EditorProvider>
          <NavbarEditor />
          <EditorSection />
        </EditorProvider>
      </form>
    </FormProvider>
  );
}
