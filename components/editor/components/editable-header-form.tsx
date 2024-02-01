import { useFormBuilder } from "../providers";
import { useFormContext } from "react-hook-form";
import { FormType } from "@/types";
import { InputInline } from "@/components/module/inline-input";

export function EditableHeaderForm() {
  const { currentScreenForm } = useFormBuilder();
  const { getValues, setValue } = useFormContext<FormType>();
  const titleForm = (currentScreenForm + ".title") as any;
  const descriptionForm = (currentScreenForm + ".description") as any;

  return (
    <header className="my-8 space-y-4">
      <div className="">
        <InputInline
          preventEnter
          value={getValues(titleForm)}
          className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl border-none focus:border-none resize-none"
          onBlur={(e) => {
            setValue(titleForm, e.currentTarget.innerText);
          }}
        />
      </div>
      <div className="">
        <InputInline
          preventEnter
          value={getValues(descriptionForm)}
          className="text-xl font-normal tracking-tight first:mt-0 border-none focus:border-none resize-none overflow-hidden h-auto"
          onBlur={(e) => {
            setValue(descriptionForm, e.currentTarget.innerText);
          }}
        />
      </div>
    </header>
  );
}
