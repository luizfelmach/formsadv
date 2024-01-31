import { useFormBuilder } from "../providers";
import { useForm } from "react-hook-form";
import { InputRadio } from "@/components/adaptable-input/InputRadio";
import { ModalAddOptions } from "../components/modal-add-options";

export function RadioEditor() {
  const { control } = useForm();
  const { currentScreen } = useFormBuilder();

  return (
    <div className="space-y-4">
      <InputRadio screen={currentScreen!} control={control} />
      <ModalAddOptions />
    </div>
  );
}
