import { InputCheckBox } from "@/components/interface/input/InputCheckBox";
import { InputDate } from "@/components/interface/input/InputDate";
import { InputRadio } from "@/components/interface/input/InputRadio";
import { InputText } from "@/components/interface/input/InputText";
import { InputTextArea } from "@/components/interface/input/InputTextArea";
import { ScreenType } from "@/types";
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
