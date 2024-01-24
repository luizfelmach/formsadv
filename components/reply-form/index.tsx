"use client";

import { ChevronLeft, ChevronRight, Loader } from "lucide-react";
import { Container } from "../container";
import { FormType } from "../types";
import { Button } from "../ui/button";
import { useReplyForm } from "./hooks";
import { ReplyFormHeader } from "./components/reply-form-header";
import { FormProvider, useForm } from "react-hook-form";
import { RevealSlide } from "../reveal-slide";
import { ReplyInput } from "./components/reply-input";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { createSchema } from "@/validation/schema";

interface ReplyFormProps {
  form: FormType;
}

function aguardar(m: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Operação concluída após 2 segundos");
    }, m);
  });
}

export function ReplyForm({ form }: ReplyFormProps) {
  const {
    currentScreen,
    canComplete,
    canGoBack,
    canProceed,
    handleBack,
    handleNext,
    handleComplete,
    screen,
  } = useReplyForm({ form });

  const schema = createSchema(form.screens);
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const {
    trigger,
    formState: { isSubmitting },
  } = methods;

  async function handleSubmit(data: any) {
    console.log(data);
    await aguardar(2000);
    handleComplete();
  }

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Enter") {
        if (canProceed) handleNext();
      }
    };
    document.body.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Container className="min-h-screen flex flex-col justify-center items-center w-screen">
      {canGoBack && (
        <section className="w-full flex justify-start px-4">
          <Button variant="outline" size="icon" onClick={() => handleBack()}>
            <ChevronLeft />
          </Button>
        </section>
      )}

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="w-full overflow-hidden"
        >
          {form.screens.map((screen, index) => (
            <RevealSlide
              key={index}
              visible={index === currentScreen}
              direction={index > currentScreen}
            >
              <div className="w-full">
                <section className="w-full">
                  <Container className="w-full">
                    <ReplyFormHeader
                      title={screen.title}
                      description={screen.description}
                    />
                  </Container>
                </section>
                <Container className="w-full">
                  <ReplyInput screen={screen} handleNext={handleNext} />
                </Container>
              </div>
            </RevealSlide>
          ))}

          <section className="w-full">
            <Container className="w-full">
              {canComplete && (
                <Button
                  className="w-full my-8"
                  type="submit"
                  variant={"default"}
                  disabled={isSubmitting}
                >
                  {isSubmitting && <Loader className="animate-spin" />}
                  Finalizar
                </Button>
              )}
            </Container>
          </section>
        </form>
      </FormProvider>

      {canProceed && (
        <section className="w-full flex justify-end px-4">
          <Button
            size={"icon"}
            onClick={async () => {
              const isValid = await trigger(screen.screenKey);
              if (!isValid) return;
              handleNext();
            }}
          >
            <ChevronRight />
          </Button>
        </section>
      )}
    </Container>
  );
}
