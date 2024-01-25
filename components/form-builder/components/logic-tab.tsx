import { useFieldArray, useFormContext } from "react-hook-form";
import { useFormBuilder } from "../providers";
import { FormType } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QueryBuilder } from "./query-builder";
import { Trash } from "lucide-react";

export function LogicTab() {
  const { screens, currentScreen } = useFormBuilder();
  const { control } = useFormContext<FormType>();

  const currentScreenIndex = screens.findIndex(
    (e) => e.screenKey === currentScreen?.screenKey
  );

  const availableScreens = screens.filter(
    (_, index) => index < currentScreenIndex
  );

  const { fields, append, remove } = useFieldArray({
    control,
    name: `screens.${currentScreenIndex}.visible`,
  });

  if (currentScreenIndex === 0) {
    return (
      <div className="mt-10">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Você não pode adicionar uma lógica na primeira página a ser exibida.
        </h3>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Tente adicionar na próxima página.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 space-y-10">
      {fields.length > 0 && (
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Mostrar essa página quando
        </h3>
      )}
      {fields.map((field, index) => (
        <div
          key={index}
          className="flex space-y-4 bg-accent p-4 border-4 border-dashed rounded-xl"
        >
          <div className="flex-1">
            <div>
              <span className="font-bold">Quando a pergunta: </span>
              {screens.find((e) => e.screenKey == field.screenKey)?.title}
            </div>
            <div>
              <span className="font-bold">Condição: </span>
              {field.query}
            </div>
            <div>
              <span className="font-bold">Valor: </span>
              {field.value}
            </div>
          </div>
          <Button
            variant={"ghost"}
            size={"icon"}
            type="button"
            onClick={() => {
              remove(index);
            }}
          >
            <Trash />
          </Button>
        </div>
      ))}
      <QueryBuilder
        availableScreens={availableScreens}
        onSave={(e) => {
          append(e);
        }}
      />
    </div>
  );
}
