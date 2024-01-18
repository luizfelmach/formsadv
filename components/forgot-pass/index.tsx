"use client";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { ForgotPass } from "@/actions";
import { useToast } from "../ui/use-toast";
import { Loader2 } from "lucide-react";

const formSchema = yup.object({
  email: yup.string().required("Forneça um e-mail.").email("Email inválido"),
});

type FormProps = yup.InferType<typeof formSchema>;

export function ForgotPassword() {
  const { toast } = useToast();
  const form = useForm<FormProps>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const {
    formState: { isSubmitting },
  } = form;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">Esqueceu a senha?</Button>
      </DialogTrigger>
      <DialogContent className="rounded-lg sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Recuperação de senha</DialogTitle>
          <DialogDescription>
            Informe seu e-mail para que possamos enviar um link de recuperação.
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(async (data: FormProps) => {
              if (await ForgotPass(data)) {
                toast({
                  title: `Enviamos um e-mail para: ${data.email}.`,
                  description: "Confira sua caixa de entrada.",
                });
                form.reset();
                return;
              }
              toast({
                title: "Não foi possível encontrar sua conta.",
                description: "Tente novamente.",
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
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <span className="mx-2">
                    <Loader2 className="animate-spin" />
                  </span>
                )}
                Enviar
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
