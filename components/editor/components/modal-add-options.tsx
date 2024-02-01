import { useFormContext } from "react-hook-form";
import { useFormBuilder } from "../providers";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FormType } from "@/types";
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

export function ModalAddOptions() {
  const { currentScreen, currentScreenForm } = useFormBuilder();
  const { setValue } = useFormContext<FormType>();

  const [options, setOptions] = useState<string[]>(
    currentScreen?.options ?? []
  );
  const [modal, setModal] = useState<boolean>(false);

  return (
    <Drawer open={modal} onOpenChange={(o) => setModal(o)}>
      <DrawerTrigger asChild>
        <Button className="mt-6" type="button" variant="ghost">
          Editar opções
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-xl">
          <DrawerHeader>
            <DrawerTitle>Edite as opções</DrawerTitle>
            <DrawerDescription>
              Coloque cada opção em uma linha.
            </DrawerDescription>
          </DrawerHeader>

          <div className="px-4">
            <Textarea
              onChange={(e) => {
                setOptions(e.target.value.split("\n"));
              }}
              value={options.join("\n")}
              rows={10}
            />
          </div>

          <DrawerFooter>
            <Button
              onClick={() => {
                let withoutEmptyStrings = options.filter(
                  (option) => option !== ""
                );
                let withoutDuplicated = Array.from(
                  new Set(withoutEmptyStrings)
                );
                setValue(
                  `${currentScreenForm}.options` as any,
                  withoutDuplicated
                );
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
  );
}
