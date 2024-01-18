"use client";

import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Login } from "@/actions";
import { useToast } from "../ui/use-toast";
import { ForgotPassword } from "../forgot-pass";
import { Loader2 } from "lucide-react";

const formSchema = yup.object({
  email: yup.string().required("Forneça seu e-mail.").email("E-mail inválido."),
  password: yup.string().required("Forneça sua senha."),
});

type FormProps = yup.InferType<typeof formSchema>;

export default function LoginForm() {
  const { toast } = useToast();
  const form = useForm<FormProps>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(async (data: FormProps) => {
            if (await Login(data)) {
              toast({
                title: "Login realizado com sucesso!",
              });
              return;
            }
            toast({
              title: "E-mail ou senha incorretos!",
              description: "Tente novamente.",
              variant: "destructive",
            });
          })}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full"
            type="submit"
            variant={"default"}
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <span className="mx-2">
                <Loader2 className="animate-spin" />
              </span>
            )}
            Enviar
          </Button>
        </form>
      </FormProvider>
      <section className="self-end">
        <ForgotPassword />
      </section>
    </div>
  );
}
