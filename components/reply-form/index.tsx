"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "../container";
import { FormType } from "../types";
import { Button } from "../ui/button";
import { useReplyForm } from "./hooks";
import { ReplyFormHeader } from "./components/reply-form-header";
import { FormProvider, useForm } from "react-hook-form";
import { RevealSlide } from "../reveal-slide";
import { ReplyInput } from "./components/reply-input";
import { useEffect } from "react";

interface ReplyFormProps {
  form: FormType;
}

export function ReplyForm({ form }: ReplyFormProps) {
  const {
    currentScreen,
    canComplete,
    canGoBack,
    canProceed,
    handleBack,
    handleNext,
  } = useReplyForm({ form });

  const methods = useForm();

  async function handleSubmit(data: any) {
    console.log(data);
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
        <form onSubmit={methods.handleSubmit(handleSubmit)} className="w-full">
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
                  <ReplyInput screen={screen} />
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
                  variant={"secondary"}
                >
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
            onClick={() => {
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
