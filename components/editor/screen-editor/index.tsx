import { useFormBuilder } from "../providers";
import { EditableHeaderForm } from "../components/editable-header-form";
import { TextEditor } from "./text-editor";
import { Container } from "@/components/container";
import { CheckBoxEditor } from "./checkbox-editor";
import { TextAreaEditor } from "./text-area-editor";
import { RadioEditor } from "./radio-editor";
import { DateEditor } from "./date-editor";

export function ScreenEditor() {
  const { currentScreen, deleteScreen } = useFormBuilder();
  if (currentScreen === null) return null;
  const type = currentScreen.type;
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Container>
        <EditableHeaderForm />
        <section className="w-full">
          {type === "statement"}
          {type === "end"}
          {type === "text" && <TextEditor />}
          {type === "textarea" && <TextAreaEditor />}
          {type === "number" && <TextEditor />}
          {type === "date" && <DateEditor />}
          {type === "radio" && <RadioEditor />}
          {type === "checkbox" && <CheckBoxEditor />}
        </section>
      </Container>
    </div>
  );
}
