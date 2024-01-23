import { Button } from "@/components/ui/button";
import { InputEntity } from "../types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useCreateForm } from "../hooks";
import { useCreateFormContext } from "../providers";
import { generateId } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface CreateInputProps {
  input?: InputEntity;
  children: React.ReactNode;
}

export function CreateInput(props: CreateInputProps) {
  const { input, children } = props;
  const [modal, setModal] = useState<boolean>(false);

  const methods = useInputHandlerForm(input);
  const { inputMethods, getCurrentPage } = useCreateFormContext();

  function handleSubmit(data: any) {
    if (input) {
      const index = inputMethods.fields.findIndex(
        (e) => e.inputKey === input.inputKey
      );
      inputMethods.update(index, {
        pageKey: input.pageKey,
        inputKey: input.inputKey,
        ...data,
      });
      setModal(false);
      return;
    }
    inputMethods.append({
      inputKey: generateId(),
      pageKey: getCurrentPage().pageKey,
      ...data,
    });
    setModal(false);
  }

  return (
    <Dialog
      open={modal}
      onOpenChange={(open) => {
        methods.reset();
        setModal(open);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="overflow-hidden px-0 rounded-xl">
        <ScrollArea className="max-h-[60vh] p-6">
          <FormProvider {...methods}>
            <form
              onSubmit={(e) => {
                e.stopPropagation();
                return methods.handleSubmit(handleSubmit)(e);
              }}
            >
              <DialogHeader>
                <DialogTitle>
                  {!input
                    ? "Adicione uma pergunta ao seu formulário."
                    : "Atualize a pergunta."}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 my-6 px-2">
                <CreateInputTabs />
              </div>
              <DialogFooter>
                <Button type="submit" variant="secondary">
                  {!input ? "Adicionar" : "Atualizar"}
                </Button>
              </DialogFooter>
            </form>
          </FormProvider>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function CreateInputTabs() {
  return (
    <Tabs defaultValue="question">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="question">Pergunta</TabsTrigger>
        <TabsTrigger value="logic">Lógica</TabsTrigger>
      </TabsList>
      <TabsContent value="question">
        <div>
          <InputHandlerQuestionContent />
        </div>
      </TabsContent>
      <TabsContent value="logic">
        <div>
          <InputHandlerLogicContent />
        </div>
      </TabsContent>
    </Tabs>
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
  const { inputMethods } = useCreateFormContext();
  const { inputsTypes, methods, queryTypes } = useInputHandler();
  const { setValue, register, control, watch } = methods;

  const targetInput = watch("when.inputKey");
  const input: InputEntity | undefined = inputMethods.fields.find(
    (e) => e.inputKey == targetInput
  );

  return (
    <div className="space-y-4">
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Mostrar essa pergunta quando
      </p>
      <FormField
        name={"when.inputKey"}
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione pergunta" />
                </SelectTrigger>
                <SelectContent>
                  {inputMethods.fields.map((input, index) => (
                    <SelectItem key={index} value={input.inputKey}>
                      {input.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {input && (
        <>
          <p className="leading-7 [&:not(:first-child)]:mt-6">Condição</p>
          <FormField
            name={"when.query"}
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Condição" />
                    </SelectTrigger>
                    <SelectContent>
                      {queryTypes[input.type].map((query, index) => (
                        <SelectItem key={index} value={query.value}>
                          {query.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
    </div>
  );
}

function CommonQuestionField() {
  const { inputsTypes, methods } = useInputHandler();
  const { setValue, register, control } = methods;

  return (
    <div className="space-y-4">
      <FormField
        name={"type"}
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value}>
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
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name={"label"}
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                placeholder="Pergunta"
                onChange={field.onChange}
                value={field.value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <CheckboxCreateForm
        id={"required"}
        label="Este campo é obrigatório?"
        description="Marque apenas se você quer este campo não fique vazio."
      />
    </div>
  );
}

function TextQuestionField() {
  const { type, methods } = useInputHandler();
  if (type !== "text") {
    return;
  }
  return (
    <div className="space-y-4">
      <CheckboxCreateForm
        id={"email"}
        label="Este campo é um e-mail?"
        description="Marque apenas se você quer haja validação de e-mail."
      />
      <CheckboxCreateForm
        id={"cpf"}
        label="Este campo é um CPF?"
        description="Marque apenas se você quer haja validação de CPF."
      />
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
            type="button"
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
        <DialogContent className="rounded-xl">
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

interface CheckboxCreateFormProps {
  id: string;
  label: string;
  description?: string;
}

function CheckboxCreateForm(props: CheckboxCreateFormProps) {
  const { id, label, description } = props;
  const { methods } = useInputHandler();
  const { control } = methods;

  return (
    <FormField
      name={id as any}
      control={control}
      render={({ field }) => (
        <FormItem className="flex items-center">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="items-top flex space-x-2 ml-4">
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor={id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {label}
              </label>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
