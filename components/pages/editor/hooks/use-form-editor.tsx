import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormType } from "@/types";
import { useEffect } from "react";
import { toast } from "sonner";

interface UseFormEditorProps {
  form: FormType;
}

const FormSchema = yup.object({
  name: yup
    .string()
    .required("Digite um nome.")
    .min(3, "Mínimo de 3 caracteres.")
    .max(75, "Máximo de 75 caracteres."),
});

export function useFormEditor({ form }: UseFormEditorProps) {
  const methods = useForm<FormType>({
    values: form,
    resolver: yupResolver(FormSchema as any),
  });

  const {
    formState: { errors },
  } = methods;

  useEffect(() => {
    toast.error("Nome do formulário inválido", {
      description: errors["name"]?.message,
    });
  }, [errors["name"]]);

  return methods;
}
