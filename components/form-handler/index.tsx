import { FormProvider, useFormContext } from "react-hook-form";
import { GenericInput } from "../generic-input";
import { InputEntity } from "../create-form/types";
import { UseFormHandlerReturn } from "./hooks";

interface FormHandlerProps {
  handleSubmit: (data: any) => void;
  methods: UseFormHandlerReturn;
  children: React.ReactNode;
}

function FormHandlerRoot(props: FormHandlerProps) {
  const { methods, children, handleSubmit } = props;
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-4">
        {children}
      </form>
    </FormProvider>
  );
}

function FormHandlerInput({ input }: { input: InputEntity }) {
  const { control } = useFormContext();
  return (
    <GenericInput
      control={control}
      defaultValue={input.defaultValue}
      inputProps={input}
    />
  );
}

export const FormHandler = {
  Root: FormHandlerRoot,
  Input: FormHandlerInput,
};
