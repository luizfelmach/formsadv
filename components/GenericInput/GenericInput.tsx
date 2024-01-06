import { UseControllerProps, useController } from "react-hook-form";
import { CommonInputType } from "@/types";
import { InputText } from "./Inputs/InputText";
import { InputDate } from "./Inputs/InputDate";
import { InputTextArea } from "./Inputs/InputTextArea";
import { InputRadio } from "./Inputs/InputRadio";
import { InputCheckBox } from "./Inputs/InputCheckBox";

interface GenericInputProps extends UseControllerProps {
  inputProps: CommonInputType;
}

export function GenericInput(props: Omit<GenericInputProps, "name">) {
  const { type } = props.inputProps;

  return (
    <>
      {type === "text" && <InputText {...props} />}
      {type === "number" && <InputText {...props} />}
      {type === "date" && <InputDate {...props} />}
      {type === "textarea" && <InputTextArea {...props} />}
      {type === "radio" && <InputRadio {...props} />}
      {type === "checkbox" && <InputCheckBox {...props} />}
    </>
  );
}
