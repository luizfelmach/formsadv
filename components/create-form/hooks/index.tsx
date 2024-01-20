import * as yup from "yup";
import { Dispatch, SetStateAction, useState } from "react";
import { InputEntity, PageEntity } from "../types";
import {
  UseFieldArrayReturn,
  UseFormReturn,
  useFieldArray,
  useForm,
} from "react-hook-form";

const createFormSchema = yup.object({
  pages: yup.array(
    yup.object({
      pageKey: yup.string().required(),
      title: yup.string().required(),
      subtitle: yup.string().required(),
    })
  ),
  inputs: yup.array(),
});

type CreateFormSchemaProps = yup.InferType<typeof createFormSchema>;

type PageMethods = UseFieldArrayReturn<CreateFormSchemaProps, "pages", "id">;

type InputMethods = UseFieldArrayReturn<CreateFormSchemaProps, "inputs", "id">;

type FormProps = UseFormReturn<CreateFormSchemaProps, any, undefined>;

interface CreateFormProps {
  pages: PageEntity[];
  inputs: InputEntity[];
}

export interface UseCreateFormsReturn {
  form: FormProps;
  pageMethods: PageMethods;
  inputMethods: InputMethods;
  currentPage: number | null;
  setCurrentPage: Dispatch<SetStateAction<number | null>>;
  getCurrentPage: () => PageEntity;
}

export function useCreateForm(props: CreateFormProps): UseCreateFormsReturn {
  const [currentPage, setCurrentPage] = useState<number | null>(null);
  const { pages: defaultPages, inputs: defaultInputs } = props;

  const form = useForm<CreateFormSchemaProps>({
    defaultValues: {
      pages: defaultPages,
      inputs: defaultInputs,
    },
  });

  const pageMethods = useFieldArray({
    control: form.control,
    name: "pages",
  });

  const inputMethods = useFieldArray({
    control: form.control,
    name: "inputs",
  });

  return {
    form,
    pageMethods,
    inputMethods,
    currentPage,
    setCurrentPage,
    getCurrentPage: () => pageMethods.fields[currentPage!],
  };
}
