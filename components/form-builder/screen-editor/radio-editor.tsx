import { useFormBuilder } from "../providers";
import { useForm, useFormContext } from "react-hook-form";
import { FormType } from "@/components/types";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { InputRadio } from "@/components/adaptable-input/InputRadio";
import { CheckboxItem } from "../components/checkbox-item";

export function RadioEditor() {
  const { control } = useForm();
  const { currentScreen, screens } = useFormBuilder();
  const { setValue } = useFormContext<FormType>();

  const currentScreenIndex = screens.findIndex(
    (e) => e.screenKey === currentScreen?.screenKey
  );

  const screen = screens[currentScreenIndex];
  const [options, setOptions] = useState<string[]>(screen.options);
  const [modal, setModal] = useState<boolean>(false);

  return (
    <div className="space-y-4">
      <InputRadio screen={screen!} control={control} />

      <Drawer open={modal} onOpenChange={(o) => setModal(o)}>
        <DrawerTrigger asChild>
          <Button className="mt-6" type="button" variant="secondary">
            Editar opções
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Edite as escolhas</DrawerTitle>
              <DrawerDescription>
                Coloque cada opção em uma linha.
              </DrawerDescription>
            </DrawerHeader>

            <div className="space-y-2 p-4">
              {options.map((option, index) => (
                <Input
                  key={index}
                  value={option}
                  onChange={(e) => {
                    setOptions((prev) => {
                      const newState = [...prev];
                      newState[index] = e.target.value;
                      return newState;
                    });
                  }}
                />
              ))}
              <Button
                type="button"
                variant={"secondary"}
                size={"icon"}
                onClick={() => {
                  setOptions((prev) => [...prev, ""]);
                }}
              >
                <Plus />
              </Button>
            </div>

            <DrawerFooter>
              <Button
                onClick={() => {
                  setValue(`screens.${currentScreenIndex}.options`, options);
                  setModal(false);
                }}
              >
                Atualizar
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

      <CheckboxItem
        name={`screens.${currentScreenIndex}.required`}
        title="Campo obrigatório ?"
        description="Selecione esse campo somente se deseja que a reposta não esteja vazia."
      />
    </div>
  );
}
