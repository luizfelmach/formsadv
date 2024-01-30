import { InputText } from "@/components/adaptable-input/InputText";
import { useFormBuilder } from "../providers";
import { useForm } from "react-hook-form";
import { CheckboxItem } from "../components/checkbox-item";

export function TextEditor() {
  const { currentScreen, screens } = useFormBuilder();
  const { control } = useForm();

  const currentScreenIndex = screens.findIndex(
    (e) => e.screenKey === currentScreen?.screenKey
  );

  return (
    <div className="space-y-4">
      <InputText screen={currentScreen!} control={control} />
    </div>
  );
}
