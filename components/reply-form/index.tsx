"use client";

import { ChevronLeft, ChevronRight, Loader, MoveRight } from "lucide-react";
import { Container } from "../container";
import { FormType } from "../../types";
import { Button } from "../ui/button";
import { useReplyForm } from "./hooks";
import { ReplyFormHeader } from "./components/reply-form-header";
import { FormProvider } from "react-hook-form";
import { RevealSlide } from "../reveal-slide";
import { ReplyInput } from "./components/reply-input";

interface ReplyFormProps {
  form: FormType;
}

export function ReplyForm({ form }: ReplyFormProps) {
  const {
    screenIndex,
    screens,
    canComplete,
    canGoBack,
    canProceed,
    handleBack,
    handleNext,
    handleComplete,
    completed,
    methods,
  } = useReplyForm({ form });

  const {
    formState: { isSubmitting },
  } = methods;

  async function handleSubmit(data: any) {
    console.log(data);
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
    handleComplete();
  }

  return (
    <Container className="min-h-screen flex flex-col justify-center items-center">
      {canGoBack && (
        <section className="w-full flex justify-start px-4">
          <Button
            className="bg-accent text-accent-foreground hover:bg-foreground/10"
            size="icon"
            type="button"
            onClick={() => handleBack()}
          >
            <ChevronLeft />
          </Button>
        </section>
      )}

      {!completed && (
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleSubmit)}
            className="w-full overflow-hidden"
          >
            {screens.map((screen, index) => (
              <RevealSlide
                key={index}
                visible={index === screenIndex}
                direction={index > screenIndex}
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
                    className="w-full h-11 font-bold"
                    type="submit"
                    variant={"default"}
                    disabled={isSubmitting}
                  >
                    Finalizar
                    {isSubmitting && <Loader className="animate-spin" />}
                  </Button>
                )}
              </Container>
            </section>
          </form>
        </FormProvider>
      )}

      <RevealSlide visible={completed} direction={true}>
        <div className="w-full">
          <section className="w-full">
            <Container className="w-full">
              <ReplyFormHeader
                title={form.endScreen.title}
                description={form.endScreen.description}
              />
            </Container>
          </section>
        </div>
      </RevealSlide>

      {canProceed && (
        <section className="w-full flex justify-end px-4">
          <Button
            onClick={async () => {
              handleNext();
            }}
            className="h-11 font-bold"
          >
            <div className="flex justify-between w-32 items-center">
              <span>Continuar</span>
              <span>
                <MoveRight />
              </span>
            </div>
          </Button>
        </section>
      )}
    </Container>
  );
}
