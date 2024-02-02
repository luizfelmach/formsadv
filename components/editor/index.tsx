"use client";

import { toast } from "sonner";
import { EditorProvider } from "./provider";
import { NavbarEditor } from "./components/navbar-editor";
import { EditorSection } from "./components/editor-section";
import { FormType } from "../../types";

interface EditorProps {
  form: FormType;
}

export function Editor({ form }: EditorProps) {
  async function handleSubmit(data: FormType) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
    toast.success("Formulário atualizado!");
  }

  return (
    <EditorProvider handleSubmit={handleSubmit} form={form}>
      <NavbarEditor />
      <EditorSection />
    </EditorProvider>
  );
}
