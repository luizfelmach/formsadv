"use client";

import { Container } from "../container";
import { InputEntity, PageEntity } from "../create-form/types";
import { FormHandler } from "../form-handler";
import { Button } from "../ui/button";
import { RespondFormHeader } from "./components";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRespondForm } from "./hooks";
import { useFormHandler } from "../form-handler/hooks";

interface RespondFormProps {
  pages: PageEntity[];
  inputs: InputEntity[];
}

export function RespondForm(props: RespondFormProps) {
  const { pages, inputs } = props;
  const {
    currentPage,
    finish,
    methods,
    next,
    back,
    page,
    setCurrentPage,
    visibleInput,
  } = useRespondForm({
    pages,
    inputs,
  });

  async function handleSubmit(data: any) {
    console.log(data);
  }

  return (
    <Container className="min-h-screen flex flex-col justify-center items-center w-screen">
      <section className="w-full">
        <Container className="w-full">
          {back && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <ChevronLeft />
            </Button>
          )}
          <RespondFormHeader title={page.title} subtitle={page.subtitle} />
        </Container>
      </section>

      <section className="w-full">
        <Container className="w-full">
          <FormHandler.Root handleSubmit={handleSubmit} methods={methods}>
            <section>
              {inputs.map((input, index) => (
                <div className={visibleInput(input.inputKey) ? "" : "hidden"}>
                  <FormHandler.Input key={index} input={input} />
                </div>
              ))}
            </section>

            {finish && (
              <Button className="w-full" type="submit">
                Finalizar
              </Button>
            )}
          </FormHandler.Root>
        </Container>
      </section>

      {next && (
        <section className="w-full flex justify-end px-4">
          <Button
            size={"icon"}
            onClick={() => {
              setCurrentPage(currentPage + 1);
            }}
          >
            <ChevronRight />
          </Button>
        </section>
      )}
    </Container>
  );
}
