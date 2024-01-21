import { createSchema } from "@/lib/createSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { GenericInput } from "../GenericInput/GenericInput";
import { createContext, useContext } from "react";
import { InputEntity } from "../create-form/types";
import { UseFormHandlerReturn } from "./hooks";

interface FormHandlerContextProps {
  inputs: InputEntity[];
  currentPageKey?: string;
}

const FormHandlerContext = createContext<FormHandlerContextProps | null>(null);

interface FormHandlerProps {
  handleSubmit: (data: any) => void;
  methods: UseFormHandlerReturn;
  children: React.ReactNode;
  inputs: InputEntity[];
  currentPageKey?: string;
}

function FormHandlerRoot(props: FormHandlerProps) {
  const { methods, children, handleSubmit, inputs, currentPageKey } = props;
  return (
    <FormHandlerContext.Provider
      value={{
        currentPageKey,
        inputs,
      }}
    >
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
  const context = useContext(FormHandlerContext);
  if (!context) {
    throw new Error("Form Handler Inputs must be used inside a context.");
  }
  const { inputs, currentPageKey } = context;

  return (
    <>
      {inputs.map((input, inputIndex) => (
        <div
          key={inputIndex}
          className={currentPageKey === input.pageKey ? "" : "hidden"}
        >
          <GenericInput
            control={control}
            defaultValue={input.defaultValue}
            inputProps={input}
          />
        </div>
      ))}
    </>
  );
}

export const FormHandler = {
  Root: FormHandlerRoot,
  Inputs: FormHandlerInputs,
};
