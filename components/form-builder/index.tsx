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
import {
  NavbarScreenFormBuilder,
  NavbarScreenFormBuilderMobile,
} from "./components/navbar-screen-form-build";
import { ScrollArea } from "../ui/scroll-area";
import { FormSettings, FormSettingsMobile } from "./components/form-settings";

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
            <section className="xl:flex justify-center h-[calc(100vh_-_3rem)]">
              <aside className="h-[calc(100vh_-_3rem)] hidden xl:flex w-full flex-1 justify-center ">
                <div className="bg-accent rounded-md w-full justify-center">
                  <ScrollArea className="h-[calc(100vh_-_3rem)]">
                    <NavbarScreenFormBuilder />
                  </ScrollArea>
                </div>
              </aside>
              <div className="h-[calc(100vh_-_3rem)] short:w-[900px] 2xl:w-[1200px]">
                <div className="xl:flex gap-3 hidden mt-4 ml-4 absolute">
                  <div className="h-4 w-4 bg-primary rounded-full bg-[#EB5A55]"></div>
                  <div className="h-4 w-4 bg-primary rounded-full bg-[#F6BC3E] "></div>
                  <div className="h-4 w-4 bg-primary rounded-full bg-[#64CC43]"></div>
                </div>
                <ScrollArea className="h-[calc(100vh_-_3rem)]">
                  <div className="flex justify-between">
                    <NavbarScreenFormBuilderMobile />
                    <FormSettingsMobile />
                  </div>
                  <ScreenEditor />
                </ScrollArea>
              </div>
              <aside className="h-[calc(100vh_-_3rem)]  hidden xl:flex flex-1 w-full justify-center">
                <div className="bg-accent rounded-md w-full justify-center">
                  <FormSettings />
                </div>
              </aside>
            </section>
          </main>
        </FormBuilderProvider>
      </form>
    </FormProvider>
  );
}
