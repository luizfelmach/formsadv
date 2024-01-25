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

export function LogicTab() {
  const { screens, currentScreen } = useFormBuilder();
  const { control, register, watch, setValue } = useFormContext<FormType>();

  const currentScreenIndex = screens.findIndex(
    (e) => e.screenKey === currentScreen?.screenKey
  );

  const possibleScreens = screens.filter(
    (_, index) => index < currentScreenIndex
  );

  const { update, fields, append } = useFieldArray({
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
      {fields.map((field, index) => (
        <div key={index} className="space-y-4">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Mostrar essa página quando
          </h3>

          <Select
            onValueChange={(e) => {
              const type = possibleScreens.find((a) => a.screenKey === e)?.type;
              setValue(
                `screens.${currentScreenIndex}.visible.${index}.screenType`,
                type as any
              );

              setValue(
                `screens.${currentScreenIndex}.visible.${index}.screenKey`,
                e
              );
            }}
          >
            <SelectTrigger onChange={(e) => console.log(e)}>
              <SelectValue placeholder="Selecione uma pergunta" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {possibleScreens.map((screen, index) => (
                  <SelectItem value={screen.screenKey}>
                    {screen.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(e) => {
              setValue(
                `screens.${currentScreenIndex}.visible.${index}.query`,
                e as any
              );
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma condição" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={"equals"}>Igual a</SelectItem>
                <SelectItem value={"notEquals"}>Diferente de</SelectItem>
                <SelectItem value={"contains"}>Tem na resposta</SelectItem>
                <SelectItem value={"startsWith"}>Inicia com</SelectItem>
                <SelectItem value={"endsWith"}>Termina com</SelectItem>
                <SelectItem value={"gt"}>Maior que</SelectItem>
                <SelectItem value={"lt"}>Menor que</SelectItem>
                <SelectItem value={"gte"}>Maior ou igual a</SelectItem>
                <SelectItem value={"lte"}>Menor ou igual a</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Input
            placeholder="Valor"
            {...register(
              `screens.${currentScreenIndex}.visible.${index}.value`
            )}
          />
        </div>
      ))}

      <Button
        type="button"
        variant={"secondary"}
        onClick={() =>
          append({
            query: "" as any,
            screenKey: "" as any,
            screenType: "" as any,
            value: "",
          })
        }
      >
        Adicionar lógica
      </Button>
    </div>
  );
}
