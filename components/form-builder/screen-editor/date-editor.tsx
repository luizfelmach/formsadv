import { InputDate } from "@/components/adaptable-input/InputDate";
import { useFormBuilder } from "../providers";

export function DateEditor() {
  const { currentScreen } = useFormBuilder();

  return (
    <div>
      <InputDate screen={currentScreen!} />
    </div>
  );
}
