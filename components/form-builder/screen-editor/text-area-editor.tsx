import { InputTextArea } from "@/components/adaptable-input/InputTextArea";
import { useFormBuilder } from "../providers";

export function TextAreaEditor() {
  const { currentScreen } = useFormBuilder();

  return (
    <div>
      <InputTextArea screen={currentScreen!} />
    </div>
  );
}
