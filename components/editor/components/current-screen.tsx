import { EditableHeaderForm } from "../components/editable-header-form";
import { ReplyBox } from "@/components/interface/reply-box";
import { InputText } from "@/components/adaptable-input/InputText";
import { useForm } from "react-hook-form";
import { InputTextArea } from "@/components/adaptable-input/InputTextArea";
import { InputCheckBox } from "@/components/adaptable-input/InputCheckBox";
import { InputDate } from "@/components/adaptable-input/InputDate";
import { InputRadio } from "@/components/adaptable-input/InputRadio";
import { ModalAddOptions } from "../components/modal-add-options";
import { useEditor } from "../hooks/use-editor";

export function CurrentScreen() {
  return (
    <ReplyBox.Root>
      <ReplyBox.Header>
        <EditableHeaderForm />
      </ReplyBox.Header>
      <ReplyBox.Input>
        <CurrentInput />
      </ReplyBox.Input>
      <ReplyBox.Footer>
        <ModalOptions />
      </ReplyBox.Footer>
    </ReplyBox.Root>
  );
}

function ModalOptions() {
  const { screen } = useEditor();
  const { type } = screen;
  if (type !== "checkbox" && type !== "radio") return null;
  return <ModalAddOptions />;
}

function CurrentInput() {
  const { screen } = useEditor();
  const { control } = useForm();
  const { type } = screen;

  if (type === "statement") return null;
  if (type === "end") return null;
  if (type === "text") return <InputText screen={screen!} control={control} />;
  if (type === "textarea")
    return <InputTextArea screen={screen!} control={control} />;
  if (type === "date") return <InputDate screen={screen!} control={control} />;
  if (type === "number")
    return <InputText screen={screen!} control={control} />;
  if (type === "checkbox")
    return <InputCheckBox screen={screen!} control={control} />;
  if (type === "radio")
    return <InputRadio screen={screen!} control={control} />;
  return null;
}
