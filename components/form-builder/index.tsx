"use client";

import { FormProvider, useForm } from "react-hook-form";
import { Container } from "../container";
import { FormType, ScreenType } from "../../types";
import { FormBuilderNav } from "./components/form-builder-nav";
import { FormBuilderScreenNav } from "./components/form-builder-screen-nav";
import { FormBuilderProvider } from "./providers";
import { ScreenEditor } from "./screen-editor";
import { v4 as uuid } from "uuid";

interface FormBuilderProps {
  form?: FormType;
}

const defaultForm: FormType = {
  screens: [
    {
      screenKey: uuid(),
      type: "text",
      title: "Faça uma pergunta aqui.",
      description: "",
      options: [],
    },
  ],
  endScreen: {
    screenKey: uuid(),
    type: "end",
    title: "Obrigado por responder esse formulário.",
    description: "Entraremos em contato com vocẽ em breve.",
    options: [],
  },
} as const;

export function FormBuilder({ form }: FormBuilderProps) {
  const initialForm = form ?? defaultForm;
  const methods = useForm<FormType>({
    values: initialForm,
  });

  function handleSubmit(data: FormType) {
    console.log(data);
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <FormBuilderProvider>
          <main className="h-screen w-screen">
            <section className="h-16 bg-accent">
              <Container>
                <FormBuilderNav />
              </Container>
            </section>
            <section className="min-h-screen">
              <Container>
                <ScreenEditor />
              </Container>
            </section>
            <FormBuilderScreenNav />
          </main>
        </FormBuilderProvider>
      </form>
    </FormProvider>
  );
}
