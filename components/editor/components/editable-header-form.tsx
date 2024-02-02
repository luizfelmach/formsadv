import { useFormBuilder } from "../provider";
import { useFormContext } from "react-hook-form";
import { FormType } from "@/types";
import { InputInline } from "@/components/module/inline-input";
import { ReplyBox } from "@/components/interface/reply-box";

export function EditableHeaderForm() {
  const { currentScreenForm } = useFormBuilder();
  const { getValues, setValue } = useFormContext<FormType>();
  const titleForm = (currentScreenForm + ".title") as any;
  const descriptionForm = (currentScreenForm + ".description") as any;

  return (
    <>
      <ReplyBox.Title>
        <InputInline
          preventEnter
          value={getValues(titleForm)}
          className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl border-none focus:border-none resize-none"
          onBlur={(e) => {
            setValue(titleForm, e.currentTarget.innerText);
          }}
        />
      </ReplyBox.Title>
      <ReplyBox.Description>
        <InputInline
          preventEnter
          value={getValues(descriptionForm)}
          className="text-xl font-normal tracking-tight first:mt-0 border-none focus:border-none resize-none overflow-hidden h-auto"
          onBlur={(e) => {
            setValue(descriptionForm, e.currentTarget.innerText);
          }}
        />
      </ReplyBox.Description>
    </>
  );
}
