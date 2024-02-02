import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormType } from "@/types";

interface UseFormEditorProps {
  form: FormType;
}

const updateFormSchema = yup.object({
  name: yup
    .string()
    .required("Digite um nome.")
    .min(3, "Mínimo de 3 caracteres.")
    .max(75, "Máximo de 75 caracteres."),
});

type UpdateFormType = yup.InferType<typeof updateFormSchema>;

export function UseFormEditor({ form }: UseFormEditorProps) {
  const methods = useForm<UpdateFormType>({
    values: form,
    resolver: yupResolver(updateFormSchema),
  });

  return methods;
}
