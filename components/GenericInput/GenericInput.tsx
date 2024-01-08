import { UseControllerProps, useFormContext, useWatch } from "react-hook-form";
import { InputEntity } from "@/types";
import { InputText } from "./Inputs/InputText";
import { InputDate } from "./Inputs/InputDate";
import { InputTextArea } from "./Inputs/InputTextArea";
import { InputRadio } from "./Inputs/InputRadio";
import { InputCheckBox } from "./Inputs/InputCheckBox";
import { useEffect, useState } from "react";

interface GenericInputProps extends UseControllerProps {
  inputProps: InputEntity;
}

export function GenericInput(props: Omit<GenericInputProps, "name">) {
  const { inputKey, type, visible } = props.inputProps;
  const { getValues, resetField } = useFormContext();
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
    resetField(inputKey);
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
