import { UseControllerProps, useController } from "react-hook-form";
import { CommonInputType } from "@/types";
import { InputText } from "./Inputs/InputText";

interface GenericInputProps extends UseControllerProps {
  inputProps: CommonInputType;
}

export function GenericInput(props: GenericInputProps) {
  const { type } = props.inputProps;

  return (
    <>
      {type === "text" && <InputText {...props} />}
      {type === "number" && <InputText {...props} />}
    </>
  );
}
