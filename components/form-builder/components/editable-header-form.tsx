import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import { useFormBuilder } from "../providers";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormType } from "@/components/types";

export function EditableHeaderForm() {
  const { screens, currentScreen } = useFormBuilder();
  const { control, register, watch } = useFormContext<FormType>();
  const { update } = useFieldArray({
    control,
    name: "screens",
  });

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Enter") {
        event.preventDefault();
      }
    };
    const textarea = document.getElementById("myTextarea")!;
    textarea.addEventListener("keydown", handleKeyDown);
    return () => {
      textarea.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const currentScreenIndex = screens.findIndex(
    (e) => e.screenKey === currentScreen?.screenKey
  );

  const edit =
    currentScreen?.type === "end"
      ? "endScreen"
      : `screens.${currentScreenIndex}`;

  const title = edit + ".title";
  const description = edit + ".description";

  return (
    <header className="my-8 space-y-4">
      <Textarea
        {...register(title as any)}
        value={watch(title as any)}
        id="myTextarea"
        className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl border-none focus:border-none resize-none overflow-hidden h-auto"
      />
      <Textarea
        id="myTextarea"
        {...register(description as any)}
        value={watch(description as any)}
        placeholder={"Descrição é opcional!"}
        className=" border-b pb-2 text-xl font-normal tracking-tight first:mt-0 border-none focus:border-none resize-none overflow-hidden h-auto"
      />
    </header>
  );
}
