import { InputTextArea } from "@/components/adaptable-input/InputTextArea";
import { useFormBuilder } from "../providers";
import { useForm } from "react-hook-form";
import { CheckboxItem } from "../components/checkbox-item";

export function TextAreaEditor() {
  const { control } = useForm();
  const { currentScreen, screens } = useFormBuilder();

  const currentScreenIndex = screens.findIndex(
    (e) => e.screenKey === currentScreen?.screenKey
  );

  return (
    <div className="space-y-4">
      <InputTextArea screen={currentScreen!} control={control} />
      <CheckboxItem
        name={`screens.${currentScreenIndex}.required`}
        title="Campo obrigatório ?"
        description="Selecione esse campo somente se deseja que a reposta não esteja vazia."
      />
    </div>
  );
}
