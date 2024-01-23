"use client";

import { FormProvider, useForm } from "react-hook-form";
import { Container } from "../container";
import { FormType } from "../types";
import { FormBuilderNav } from "./components/form-builder-nav";
import { FormBuilderScreenNav } from "./components/form-builder-screen-nav";
import { FormBuilderProvider } from "./providers";
import { ScreenEditor } from "./screen-editor";

interface FormBuilderProps {
  form?: FormType;
}

export function FormBuilder({ form }: FormBuilderProps) {
  const methods = useForm<FormType>({
    values: form,
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
