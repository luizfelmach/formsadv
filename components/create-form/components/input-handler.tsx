import { Button } from "../../ui/button";
import { generateId } from "@/lib/utils";
import { useCreateFormContext } from "../providers";
import { InputEntity } from "../types";
import * as yup from "yup";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../ui/drawer";
import { Container } from "@/components/container";
import { FormProvider } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useInputHandler, useInputHandlerForm } from "../hooks/input-handler";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Textarea } from "@/components/ui/textarea";
import { Trash } from "lucide-react";

interface InputHandlerProps {
  input?: InputEntity;
  children: React.ReactNode;
}

export function InputHandler(props: InputHandlerProps) {
  const { input, children } = props;
  const { inputMethods, getCurrentPage } = useCreateFormContext();

  const methods = useInputHandlerForm();

  function handleSubmit(data: any) {
    console.log(data);
    inputMethods.append({
      inputKey: generateId(),
      pageKey: getCurrentPage().pageKey,
      ...data,
    });
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Adicione uma pergunta ao seu formulário.</DrawerTitle>
          </DrawerHeader>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <Container className="w-full">
              <Tabs defaultValue="question">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="question">Pergunta</TabsTrigger>
                  <TabsTrigger value="logic">Lógica</TabsTrigger>
                </TabsList>
                <TabsContent value="question">
                  <InputHandlerQuestionContent />
                </TabsContent>
                <TabsContent value="logic">
                  <InputHandlerLogicContent />
                </TabsContent>
              </Tabs>
              <DrawerFooter>
                <Button type="submit">Adicionar</Button>
              </DrawerFooter>
            </Container>
          </form>
        </FormProvider>
      </DrawerContent>
    </Drawer>
  );
}

function InputHandlerQuestionContent() {
  return (
    <div className="space-y-4">
      <CommonQuestionField />
      <TextQuestionField />
      <OptionsQuestionField />
    </div>
  );
}

function InputHandlerLogicContent() {
  return <div>Lógica</div>;
}

function CommonQuestionField() {
  const { inputsTypes } = useInputHandler();
  const { methods } = useInputHandler();
  const { setValue, register } = methods;

  return (
    <div className="space-y-4">
      <Select onValueChange={(data: string) => setValue("type", data as any)}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione o tipo de pergunta" />
        </SelectTrigger>
        <SelectContent>
          {inputsTypes.map((inputType, index) => (
            <SelectItem key={index} value={inputType.value}>
              {inputType.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input placeholder="Pergunta" {...register("label")} />
      <div className="items-top flex space-x-2">
        <Checkbox
          id="required"
          onCheckedChange={(data: boolean) => setValue("required", data)}
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="required"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Este campo é obrigatório?
          </label>
          <p className="text-sm text-muted-foreground">
            Marque apenas se você quer este campo não fique vazio.
          </p>
        </div>
      </div>
    </div>
  );
}

function TextQuestionField() {
  const { type, methods } = useInputHandler();
  const { setValue } = methods;
  if (type !== "text") {
    return;
  }
  return (
    <div className="space-y-4">
      <div className="items-top flex space-x-2">
        <Checkbox
          id="email"
          onCheckedChange={(data: boolean) => setValue("email", data)}
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="email"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Este campo é um e-mail?
          </label>
          <p className="text-sm text-muted-foreground">
            Marque apenas se você quer haja validação de e-mail.
          </p>
        </div>
      </div>
      <div className="items-top flex space-x-2">
        <Checkbox
          id="cpf"
          onCheckedChange={(data: boolean) => setValue("email", data)}
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="cpf"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Este campo é um CPF?
          </label>
          <p className="text-sm text-muted-foreground">
            Marque apenas se você quer haja validação de CPF.
          </p>
        </div>
      </div>
    </div>
  );
}

function OptionsQuestionField() {
  const { options, appendOption, type, updateOption, removeOption } =
    useInputHandler();
  if (type !== "radio" && type !== "checkbox") {
    return;
  }

  return (
    <div className="space-y-4">
      <p className="leading-7 [&:not(:first-child)]:mt-6">Opções</p>

      {options.map((option, index) => (
        <div
          key={index}
          className="flex items-center bg-accent p-4 rounded-xl border"
        >
          <div className="space-y-3 py-2 flex-1">
            <span className="text-sm font-medium leading-none">
              {option.value}
            </span>
            <p className="font-normal">{option.description}</p>
          </div>
          <Button
            onClick={() => removeOption(index)}
            variant={"ghost"}
            size={"icon"}
          >
            <Trash />
          </Button>
        </div>
      ))}

      <Dialog>
        <DialogTrigger asChild>
          <Button
            type="button"
            variant={"secondary"}
            onClick={() => {
              appendOption({
                value: "",
                description: "",
              });
            }}
          >
            Adicionar
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Adicionar uma opção.</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Input
              onChange={(e) => {
                const index = options.length - 1;
                const option = options[index];
                updateOption(options.length - 1, {
                  value: e.target.value,
                  description: option.description,
                });
              }}
              placeholder="Opção"
            />
            <Textarea
              onChange={(e) => {
                const index = options.length - 1;
                const option = options[index];
                updateOption(options.length - 1, {
                  value: option.value,
                  description: e.target.value,
                });
              }}
              placeholder="Descrição"
            />
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant={"secondary"}>
                Adicionar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
