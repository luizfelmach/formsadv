"use client";

import { ArrowRight, ChevronLeft, Loader2, Send } from "lucide-react";
import { Button } from "../ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { GenericInput } from "../GenericInput/GenericInput";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormPageEntity } from "@/types";
import { createSchema } from "@/lib/createSchema";

interface FormSectionProps {
  FormsPages: FormPageEntity[];
}

export function FormSection({ FormsPages }: FormSectionProps) {
  const inputs = FormsPages.map((form) => form.inputs).flat();
  const schema = createSchema(inputs);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const methods = useForm<any>({
    //mode: "onChange",
    //resolver: yupResolver(schema as any),
  });

  const { handleSubmit, control, formState, trigger } = methods;
  const { isSubmitting } = formState;

  const submit = async (data: any) => {
    console.log(data);
  };

  return (
    <main className="flex flex-col">
      <div>
        <Button
          variant="outline"
          size="icon"
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <ChevronLeft />
        </Button>
      </div>

      <header className="my-8 space-y-4">
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl">
          {FormsPages[currentPage].title}
        </h1>
        <h2 className="scroll-m-20 border-b pb-2 text-xl font-normal tracking-tight first:mt-0">
          {FormsPages[currentPage].subtitle}
        </h2>
      </header>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          {FormsPages.map((form, formIndex) =>
            form.inputs.map((input, inputIndex) => (
              <div
                key={inputIndex}
                className={formIndex !== currentPage ? "hidden" : ""}
              >
                <GenericInput
                  control={control}
                  defaultValue={input.defaultValue}
                  inputProps={input}
                />
              </div>
            ))
          )}

          {currentPage + 1 === FormsPages.length && (
            <div className="py-32">
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                Finalizar
              </Button>
            </div>
          )}
        </form>
      </FormProvider>

      {currentPage + 1 != FormsPages.length && (
        <div className="self-end my-10">
          <Button
            variant="default"
            size="icon"
            onClick={async () => {
              const isValid = await trigger(
                FormsPages[currentPage].inputs.map((input) => input.inputKey)
              );
              if (!isValid) {
                return;
              }
              setCurrentPage(currentPage + 1);
            }}
          >
            <ArrowRight />
          </Button>
        </div>
      )}
    </main>
  );
}
