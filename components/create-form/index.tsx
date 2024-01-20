"use client";

import { useCreateForm } from "./hooks";
import { Container } from "../container";
import { CreateFormContext } from "./providers";
import { InputEntity, PageEntity } from "./types";

import { PageNav, CreateFormNav, CurrentPage } from "./components";

interface CreateFormProps {
  pages: PageEntity[];
  inputs: InputEntity[];
}

export function CreateForm(props: CreateFormProps) {
  const methods = useCreateForm(props);

  return (
    <CreateFormContext.Provider value={methods}>
      <main className="h-screen w-screen">
        <section className="h-16 bg-accent">
          <Container>
            <CreateFormNav />
          </Container>
        </section>
        <section className="min-h-screen">
          <Container>
            <CurrentPage />
          </Container>
        </section>
        <PageNav />
      </main>
    </CreateFormContext.Provider>
  );
}
