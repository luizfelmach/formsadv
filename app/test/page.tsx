"use client";

import { InputInline } from "@/components/module/inline-input";
import { useForm } from "react-hook-form";

export default function Page() {
  const { handleSubmit, setValue, getValues } = useForm<{
    test: string;
  }>({
    defaultValues: {
      test: "",
    },
  });
  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <InputInline
        className="text-over scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
        onInput={(e) => {
          setValue("test", e.currentTarget.innerText);
        }}
        value={getValues("test")}
        preventEnter
      />
      <input type="text" />
      <button type="submit">Enviar</button>
    </form>
  );
}
