import { InputCheckBox } from "@/components/adaptable-input/InputCheckBox";
import { useFormBuilder } from "../providers";
import { useForm } from "react-hook-form";
import { ModalAddOptions } from "../components/modal-add-options";

export function CheckBoxEditor() {
  const { control } = useForm();
  const { currentScreen } = useFormBuilder();

  return (
    <div className="space-y-4">
      <InputCheckBox screen={currentScreen!} control={control} />
      <ModalAddOptions />
    </div>
  );
}
