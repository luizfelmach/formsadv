"use client";

import * as yup from "yup";
import { toast } from "sonner";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavbarEditor } from "./components/navbar-editor";
import { FormBuilderProvider } from "./providers";
import { EditorSection } from "./components/editor-section";
import { FormType } from "../../types";

interface FormBuilderProps {
  form: FormType;
}

const updateFormSchema = yup.object({
  name: yup
    .string()
    .required("Digite um nome.")
    .min(3, "Mínimo de 3 caracteres.")
    .max(75, "Máximo de 75 caracteres."),
});

type UpdateFormType = yup.InferType<typeof updateFormSchema>;

export function Editor({ form }: FormBuilderProps) {
  const methods = useForm<UpdateFormType>({
    values: form,
    resolver: yupResolver(updateFormSchema),
  });

  async function handleSubmit(data: UpdateFormType) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
    toast.success("Formulário atualizado!");
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <FormBuilderProvider>
          <NavbarEditor />
          <EditorSection />
        </FormBuilderProvider>
      </form>
    </FormProvider>
  );
}
