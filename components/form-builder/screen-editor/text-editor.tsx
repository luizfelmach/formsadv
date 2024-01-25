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
      <CheckboxItem
        name={`screens.${currentScreenIndex}.required`}
        title="Campo obrigatório ?"
        description="Selecione esse campo somente se deseja que a reposta não esteja vazia."
      />

      <CheckboxItem
        name={`screens.${currentScreenIndex}.email`}
        title="Campo é um e e-mail ?"
        description="Selecione esse campo somente se deseja que haja validação de e-mail."
      />

      <CheckboxItem
        name={`screens.${currentScreenIndex}.cpf`}
        title="Campo é um CPF ?"
        description="Selecione esse campo somente se deseja que haja validação de CPF."
      />
    </div>
  );
}
