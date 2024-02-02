import { EditableHeaderForm } from "../components/editable-header-form";
import { ReplyBox } from "@/components/interface/reply-box";
import { ModalAddOptions } from "../components/modal-add-options";
import { useEditor } from "../hooks/use-editor";
import { useForm } from "react-hook-form";
import { InputText } from "@/components/interface/input/InputText";
import { InputTextArea } from "@/components/interface/input/InputTextArea";
import { InputDate } from "@/components/interface/input/InputDate";
import { InputCheckBox } from "@/components/interface/input/InputCheckBox";
import { InputRadio } from "@/components/interface/input/InputRadio";

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
