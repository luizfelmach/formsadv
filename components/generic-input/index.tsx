import { useEffect, useState } from "react";
import { UseControllerProps, useFormContext, useWatch } from "react-hook-form";
import { InputCheckBoxEntity, InputEntity, InputRadioEntity } from "@/types";
import { InputText } from "./inputs/InputText";
import { InputDate } from "./inputs/InputDate";
import { InputTextArea } from "./inputs/InputTextArea";
import { InputRadio } from "./inputs/InputRadio";
import { InputCheckBox } from "./inputs/InputCheckBox";

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
          {type === "radio" && (
            <InputRadio
              {...props}
              inputProps={props.inputProps as InputRadioEntity}
            />
          )}
          {type === "checkbox" && (
            <InputCheckBox
              {...props}
              inputProps={props.inputProps as InputCheckBoxEntity}
            />
          )}
        </>
      )}
    </>
  );
}
