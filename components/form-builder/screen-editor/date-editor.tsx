import { InputDate } from "@/components/adaptable-input/InputDate";
import { useFormBuilder } from "../providers";
import { useForm } from "react-hook-form";

export function DateEditor() {
  const { control } = useForm();
  const { currentScreen } = useFormBuilder();

  return (
    <div>
      <InputDate screen={currentScreen!} control={control} />
    </div>
  );
}
