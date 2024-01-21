import { InputEntity } from "@/components/create-form/types";
import { createSchema } from "@/lib/createSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { UseFormReturn, useForm } from "react-hook-form";

interface UseFormHandlerProps {
  inputs: InputEntity[];
}

export type UseFormHandlerReturn = UseFormReturn<any>;

export function useFormHandler(props: UseFormHandlerProps) {
  const { inputs } = props;
  const schema = createSchema(inputs as any);

  const methods = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(schema as any),
  });
  return methods;
}
