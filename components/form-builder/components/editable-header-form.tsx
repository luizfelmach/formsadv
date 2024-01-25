import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import { useFormBuilder } from "../providers";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormType } from "@/types";

export function EditableHeaderForm() {
  const { screens, currentScreen } = useFormBuilder();
  const { control } = useFormContext<FormType>();
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

  const screen = screens[currentScreenIndex];

  return (
    <header className="my-8 space-y-4">
      <Textarea
        id="myTextarea"
        onChange={(event) => {
          const textarea = event.target;
          textarea.style.height = "auto";
          textarea.style.height = `${textarea.scrollHeight}px`;
          update(currentScreenIndex, {
            ...screen,
            title: event.target.value,
          });
        }}
        value={screen.title}
        className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl border-none focus:border-none resize-none overflow-hidden h-auto"
      />
      <Textarea
        id="myTextarea"
        placeholder={"Descrição é opcional!"}
        onChange={(event) => {
          const textarea = event.target;
          textarea.style.height = "auto";
          textarea.style.height = `${textarea.scrollHeight}px`;
          update(currentScreenIndex, {
            ...screen,
            description: event.target.value,
          });
        }}
        value={screen.description}
        className=" border-b pb-2 text-xl font-normal tracking-tight first:mt-0 border-none focus:border-none resize-none overflow-hidden h-auto"
      />
    </header>
  );
}
