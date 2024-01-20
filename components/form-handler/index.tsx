import { createSchema } from "@/lib/createSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { GenericInput } from "../GenericInput/GenericInput";
import { createContext, useContext } from "react";
import { InputEntity } from "../create-form/types";

interface FormHandlerInputsProps {
  inputs: InputEntity[];
  children?: React.ReactNode;
  handleSubmit: (data: any) => void;
}

const FormHandlerContext = createContext<InputEntity[] | null>(null);

function FormHandlerRoot(props: FormHandlerInputsProps) {
  const { inputs, handleSubmit, children } = props;
  const schema = createSchema(inputs as any);

  const methods = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(schema as any),
  });

  return (
    <FormHandlerContext.Provider value={inputs}>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="space-y-4"
        >
          {children}
        </form>
      </FormProvider>
    </FormHandlerContext.Provider>
  );
}

function FormHandlerInputs() {
  const { control } = useFormContext();
  const inputs = useContext(FormHandlerContext);
  if (!inputs) {
    throw new Error("Form Handler Inputs must be used inside a context.");
  }
  return (
    <>
      {inputs.map((input, inputIndex) => (
        <GenericInput
          key={inputIndex}
          control={control}
          defaultValue={input.defaultValue}
          inputProps={input}
        />
      ))}
    </>
  );
}

export const FormHandler = {
  Root: FormHandlerRoot,
  Inputs: FormHandlerInputs,
};
