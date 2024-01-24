import { InputCheckBox } from "@/components/adaptable-input/InputCheckBox";
import { InputDate } from "@/components/adaptable-input/InputDate";
import { InputRadio } from "@/components/adaptable-input/InputRadio";
import { InputText } from "@/components/adaptable-input/InputText";
import { InputTextArea } from "@/components/adaptable-input/InputTextArea";
import { ScreenType } from "@/components/types";
import { useFormContext } from "react-hook-form";

interface ReplyInputProps {
  screen: ScreenType;
  handleNext: () => void;
}

export function ReplyInput({ screen, handleNext }: ReplyInputProps) {
  const { control } = useFormContext();
  const type = screen.type;

  return (
    <>
      {type === "end" && <></>}
      {type === "statement" && <></>}
      {type === "text" && (
        <InputText screen={screen} control={control} defaultValue={""} />
      )}
      {type === "textarea" && (
        <InputTextArea screen={screen} control={control} defaultValue={""} />
      )}
      {type === "number" && (
        <InputText screen={screen} control={control} defaultValue={""} />
      )}
      {type === "date" && (
        <InputDate screen={screen} control={control} defaultValue={""} />
      )}
      {type === "checkbox" && (
        <InputCheckBox screen={screen} control={control} defaultValue={[]} />
      )}
      {type === "radio" && (
        <InputRadio
          screen={screen}
          control={control}
          defaultValue={""}
          handleNext={handleNext}
        />
      )}
    </>
  );
}
