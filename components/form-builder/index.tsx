"use client";

import { FormProvider, useForm } from "react-hook-form";
import { Container } from "../container";
import { FormType, ScreenType } from "../../types";
import { NavbarFormBuilder } from "./components/navbar-form-builder";
import { FormBuilderScreenNav } from "./components/form-builder-screen-nav";
import { FormBuilderProvider } from "./providers";
import { ScreenEditor } from "./screen-editor";
import { v4 as uuid } from "uuid";
import { useEffect } from "react";

interface FormBuilderProps {
  form?: FormType;
}

const defaultForm: FormType = {
  id: "123",
  name: "lskdjf",
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

  function handleSubmit(data: FormType) {
    console.log(data);
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <FormBuilderProvider>
          <main>
            <NavbarFormBuilder />
            <section className="xl:flex justify-center">
              <aside className="h-screen bg-red hidden xl:flex w-72 flex-1 justify-center">
                <div className="bg-accent h-screen rounded-md m-4 w-96 justify-center">
                  ok
                </div>
              </aside>
              <div className="h-screen xl:w-[670px]">
                <Container>
                  <ScreenEditor />
                </Container>
              </div>
              <aside className="h-screen hidden xl:flex w-72 flex-1 justify-center">
                <div className="bg-accent h-screen rounded-md m-4 w-96 justify-center">
                  ok
                </div>
              </aside>
            </section>
          </main>
        </FormBuilderProvider>
      </form>
    </FormProvider>
  );
}
