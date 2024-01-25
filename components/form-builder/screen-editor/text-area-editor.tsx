import { InputTextArea } from "@/components/adaptable-input/InputTextArea";
import { useFormBuilder } from "../providers";
import { useForm } from "react-hook-form";

export function TextAreaEditor() {
  const { control } = useForm();
  const { currentScreen } = useFormBuilder();

  return (
    <div>
      <InputTextArea screen={currentScreen!} control={control} />
    </div>
  );
}
