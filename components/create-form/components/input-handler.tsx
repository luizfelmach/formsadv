import { Button } from "../../ui/button";
import { generateId } from "@/lib/utils";
import { FormHandler } from "../../form-handler";
import { InputsTypes } from "@/types";
import { useCreateFormContext } from "../providers";
import { InputEntity } from "../types";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../ui/drawer";

interface InputHandlerProps {
  input?: InputEntity;
  children: React.ReactNode;
}

export function InputHandler(props: InputHandlerProps) {
  const { inputMethods, getCurrentPage } = useCreateFormContext();
  const { input, children } = props;

  const inputs: InputEntity[] = [
    {
      inputKey: "type",
      type: "select",
      defaultValue: "",
      label: "Selecione um tipo de pergunta",
      options: [...InputsTypes],
      pageKey: "x",
      required: false,
    },
    {
      inputKey: "label",
      type: "textarea",
      label: "Qual a pergunta ?",
      defaultValue: "",
      required: false,
      pageKey: "x",
    },
  ];

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Adicione uma pergunta ao seu formulário.</DrawerTitle>
          </DrawerHeader>
        </div>
        <div className="flex justify-center">
          <FormHandler.Root
            inputs={inputs}
            handleSubmit={(data) => {
              inputMethods.append({
                inputKey: generateId(),
                type: data.type,
                defaultValue: "",
                label: "Nome",
                pageKey: getCurrentPage().pageKey,
              });
            }}
          >
            <FormHandler.Inputs />

            <Button className="w-96" type="submit">
              Criar
            </Button>
          </FormHandler.Root>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
