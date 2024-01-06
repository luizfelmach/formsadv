import { UseControllerProps, useFormContext, useWatch } from "react-hook-form";
import { CommonInputType } from "@/types";
import { InputText } from "./Inputs/InputText";
import { InputDate } from "./Inputs/InputDate";
import { InputTextArea } from "./Inputs/InputTextArea";
import { InputRadio } from "./Inputs/InputRadio";
import { InputCheckBox } from "./Inputs/InputCheckBox";
import { useEffect, useState } from "react";

interface GenericInputProps extends UseControllerProps {
  inputProps: CommonInputType;
}

export function GenericInput(props: Omit<GenericInputProps, "name">) {
  const { type, visible } = props.inputProps;
  const { getValues } = useFormContext();
  const [show, setShow] = useState(true);
  const { control } = props;

  const watch = useWatch({
    control,
    name: visible?.when.inputKey || "",
  });

  useEffect(() => {
    if (!visible) {
      setShow(true);
      return;
    }
    if (getValues(visible.when.inputKey) == visible.when.equals) {
      setShow(true);
      return;
    }
    setShow(false);
  }, [watch]);

  return (
    <>
      {show && (
        <>
          {type === "text" && <InputText {...props} />}
          {type === "number" && <InputText {...props} />}
          {type === "date" && <InputDate {...props} />}
          {type === "textarea" && <InputTextArea {...props} />}
          {type === "radio" && <InputRadio {...props} />}
          {type === "checkbox" && <InputCheckBox {...props} />}
        </>
      )}
    </>
  );
}
