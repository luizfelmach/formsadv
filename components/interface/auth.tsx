"use client";
import * as yup from "yup";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FormProvider, useForm } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loader } from "lucide-react";

export function Auth() {
  return (
    <div className="h-screen items-center w-screen grid md:grid-cols-2">
      <div className="bg-primary m-8 rounded-xl overflow-hidden hidden md:block">
        <header>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary-foreground m-16">
            Crie formulários para conhecer seu público!
          </h1>
        </header>

        <Image
          alt="Preview de um formulário gerado no Meu Form."
          src={"auth-banner.svg"}
          width={700}
          height={200}
          className="mx-auto"
        />
      </div>
      <div className="flex flex-col items-center mx-8">
        <div className="my-16">
          <Image
            alt="Logo Meu Form."
            src={"logo-brand.svg"}
            width={150}
            height={200}
          />
        </div>
        <div className="max-w-96 w-full">
          <Tabs defaultValue="login">
            <TabsList className="mx-auto grid w-72 grid-cols-2">
              <TabsTrigger value="login">Acessar</TabsTrigger>
              <TabsTrigger value="create">Criar Conta</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginContent />
            </TabsContent>
            <TabsContent value="create">
              <CreateAccountContent />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

const loginSchema = yup.object({
  email: yup.string().email("E-mail inválido.").required("Digite seu e-mail."),
  password: yup.string().required("Digite sua senha."),
});

type loginType = yup.InferType<typeof loginSchema>;

function LoginContent() {
  const methods = useForm<loginType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });
  const {
    formState: { isSubmitting },
  } = methods;

  async function handleSubmit(data: loginType) {
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
    console.log(data);
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className="mt-12">
        <div className="space-y-4 mb-10">
          <FormField
            name="email"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="E-mail"
                    className="bg-accent border-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Senha"
                    className="bg-accent border-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-4">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Acessar
            {isSubmitting && <Loader className="animate-spin" />}
          </Button>
          <Button type="button" variant={"link"} className="w-full">
            Esqueci minha senha
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

const createAccountSchema = yup.object({
  name: yup.string().required("Digite seu nome."),
  email: yup.string().email("E-mail inválido.").required("Digite seu e-mail."),
  password: yup.string().required("Digite sua senha."),
  confirmPassword: yup
    .string()
    .required("Confirme sua senha.")
    .oneOf([yup.ref("password")], "Sua senha não confere."),
});

type createAccountType = yup.InferType<typeof createAccountSchema>;

function CreateAccountContent() {
  const methods = useForm<createAccountType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(createAccountSchema),
  });

  const {
    formState: { isSubmitting },
  } = methods;

  async function handleSubmit(data: loginType) {
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
    console.log(data);
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className="mt-12">
        <div className="space-y-4 mb-10">
          {" "}
          <FormField
            name="name"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Nome"
                    className="bg-accent border-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="E-mail"
                    className="bg-accent border-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Senha"
                    className="bg-accent border-none"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="confirmPassword"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Confirmar senha"
                    className="bg-accent border-none"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-4">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Criar
            {isSubmitting && <Loader className="animate-spin" />}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
