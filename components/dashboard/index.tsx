"use client";
import { Button } from "../ui/button";
import { FormType } from "@/types";
import { Container } from "../container";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { DialogClose } from "@radix-ui/react-dialog";
import { Eye, Loader, Pencil, Unlink2 } from "lucide-react";
import { toast } from "sonner";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Navbar } from "./components/navbar";

interface DashboardProps {
  forms: FormType[];
}

export function Dashboard({ forms }: DashboardProps) {
  const size = forms.length;

  if (size === 0) {
    return (
      <Container>
        <EmptyFormsDashboard />
      </Container>
    );
  }

  return (
    <div>
      <Navbar />
      <Container>
        <div className="mt-8">
          <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl">
            Formulários
          </h1>
          <div className="flex justify-end mb-8">
            <ModalCreateForm />
          </div>
          <div className="space-y-4">
            {forms.map((form, index) => (
              <div
                key={index}
                className="min-h-20 bg-background border border-accent rounded-xl p-4 flex justify-between items-center"
              >
                <section className="flex-1 flex flex-col">
                  <p className="text-foreground font-semibold">{form.name}</p>
                  <p className="text-accent-foreground mt-4 text-sm">
                    Respostas: {10}
                  </p>
                </section>
                <section className="text-foreground">
                  <CopyToClipboard text="https://">
                    <Button
                      type="submit"
                      variant={"ghost"}
                      size={"icon"}
                      onClick={() => {
                        toast.info(
                          "Link copiado para a área de transferência."
                        );
                      }}
                    >
                      <Unlink2 />
                    </Button>
                  </CopyToClipboard>
                  <Button type="submit" variant={"ghost"} size={"icon"}>
                    <Pencil />
                  </Button>
                  <Button type="submit" variant={"ghost"} size={"icon"}>
                    <Eye />
                  </Button>
                </section>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

function EmptyFormsDashboard() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="overflow-visible">
        <Image
          src={"/empty-forms.svg"}
          alt=""
          width={550}
          height={100}
          priority
        />
      </div>
      <header>
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl">
          Você não possui nenhum formulário ainda.
        </h1>
        <h2 className="scroll-m-20 pb-2  text-xl font-normal tracking-tight first:mt-0">
          Crie agora mesmo um formulário.
        </h2>
      </header>
      <ModalCreateForm />
    </div>
  );
}

const createFormSchema = yup.object({
  name: yup
    .string()
    .required("Digite um nome.")
    .min(3, "Mínimo de 3 caracteres.")
    .max(75, "Máximo de 75 caracteres."),
});

type createFormType = yup.InferType<typeof createFormSchema>;

function ModalCreateForm() {
  const methods = useForm<createFormType>({
    defaultValues: { name: "" },
    resolver: yupResolver(createFormSchema),
  });

  const {
    formState: { isSubmitting },
  } = methods;

  async function handleSubmit(data: createFormType) {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // TODO: redirect to edit form
    // TODO: create a template form
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="self-end font-bold w-28 mt-8">Criar</Button>
      </DialogTrigger>
      <DialogContent className="h-screen max-w-screen">
        <Container className="flex flex-col justify-center items-center">
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(handleSubmit)}
              className="flex flex-col gap-4"
            >
              <header>
                <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl">
                  Dê um nome ao seu formulário
                </h1>
              </header>
              <FormField
                name="name"
                control={methods.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="w-full h-11 border-none bg-accent text-accent-foreground"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-4">
                <DialogClose asChild>
                  <Button
                    className="h-11 font-bold mt-8 bg-accent text-accent-foreground hover:bg-accent/50"
                    type="button"
                  >
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  className="h-11 font-bold mt-8"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Começar a editar
                  {isSubmitting && <Loader className="animate-spin" />}
                </Button>
              </div>
            </form>
          </FormProvider>
        </Container>
      </DialogContent>
    </Dialog>
  );
}
