import * as yup from "yup";
import { InputEntity } from "../types";
import { useCreateFormContext } from "../providers";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

const inputsTypes = [
  {
    value: "text",
    label: "Texto",
  },
  {
    value: "textarea",
    label: "Texto grande",
  },
  {
    value: "number",
    label: "Número",
  },
  {
    value: "date",
    label: "Data",
  },
  {
    value: "checkbox",
    label: "Selecione várias opções",
  },
  {
    value: "radio",
    label: "Selecione apenas uma opção",
  },
] as const;

const a = [
  { value: "equals", label: "Igual a" },
  { value: "notEquals", label: "Diferente de" },
  { value: "in", label: "Está em" },
  { value: "notIn", label: "Não está em" },
  { value: "contains", label: "Tem" },
  { value: "startsWith", label: "Começa com" },
  { value: "endsWith", label: "Termina com" },
  { value: "gt", label: "Maior que" },
  { value: "lt", label: "Menor que" },
  { value: "lte", label: "Menor que ou igual a" },
  { value: "gte", label: "Maior que ou igual a" },
  { value: "is", label: "É" },
];

const queryTypes = {
  text: [
    { value: "equals", label: "Igual a" },
    { value: "contains", label: "Tem" },
    { value: "startsWith", label: "Começa com" },
    { value: "endsWith", label: "Termina com" },
  ],
  textarea: [
    { value: "equals", label: "Igual a" },
    { value: "contains", label: "Tem" },
    { value: "startsWith", label: "Começa com" },
    { value: "endsWith", label: "Termina com" },
  ],
  number: [
    { value: "equals", label: "Igual a" },
    { value: "gt", label: "Maior que" },
    { value: "lt", label: "Menor que" },
    { value: "lte", label: "Menor que ou igual a" },
    { value: "gte", label: "Maior que ou igual a" },
  ],
  date: [
    { value: "gt", label: "Maior que" },
    { value: "lt", label: "Menor que" },
    { value: "lte", label: "Menor que ou igual a" },
    { value: "gte", label: "Maior que ou igual a" },
  ],
  checkbox: [
    { value: "in", label: "Está em" },
    { value: "notIn", label: "Não está em" },
  ],
  radio: [{ value: "is", label: "É" }],
};

const formSchema = yup.object({
  type: yup.string().required(),
  label: yup.string().required(),
  //defaultValue: yup.mixed()
  required: yup.boolean(),
  email: yup.boolean(),
  cpf: yup.boolean(),
  options: yup.array(
    yup.object({
      value: yup.string().required(),
      description: yup.string(),
    })
  ),
  when: yup
    .object({
      inputKey: yup.string(),
      query: yup.string(),
      value: yup.mixed(),
    })
    .optional()
    .nullable(),
});

type FormProps = yup.InferType<typeof formSchema>;

export function useInputHandlerForm(input?: InputEntity) {
  const methods = useForm<FormProps>({
    values: (input as any) ?? {},
    resolver: yupResolver(formSchema),
  });

  return methods;
}

export function useInputHandler() {
  const methods = useFormContext<FormProps>();

  const { watch, control, reset, resetField, setValue } = methods;

  const {
    append: appendOption,
    fields: options,
    update: updateOption,
    remove: removeOption,
    replace: replaceOption,
  } = useFieldArray({
    control: control,
    name: "options",
  });

  const type = watch("type");

  return {
    type,
    methods,
    options,
    appendOption,
    updateOption,
    removeOption,
    inputsTypes,
    queryTypes,
  };
}
