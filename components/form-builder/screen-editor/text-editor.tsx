import { InputText } from "@/components/adaptable-input/InputText";
import { useFormBuilder } from "../providers";
import { useForm } from "react-hook-form";

export function TextEditor() {
  const { currentScreen } = useFormBuilder();
  const { control } = useForm();

  return (
    <div>
      <InputText screen={currentScreen!} control={control} />
    </div>
  );
}
