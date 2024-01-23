import { InputText } from "@/components/adaptable-input/InputText";
import { useFormBuilder } from "../providers";

export function TextEditor() {
  const { currentScreen } = useFormBuilder();

  return (
    <div>
      <InputText screen={currentScreen!} />
    </div>
  );
}
