import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Currency, Divide, PlusCircle, Settings, Trash } from "lucide-react";
import { inputOptions, queries } from "../const";
import Image from "next/image";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormType } from "@/types";
import { useFormBuilder } from "../providers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { QueryBuilder } from "./query-builder";

export function FormSettings() {
  const { currentScreen } = useFormBuilder();

  if (currentScreen?.type === "end") return null;

  return (
    <Tabs defaultValue="settings" className="m-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="settings">Configurações</TabsTrigger>
        <TabsTrigger value="logic">Lógica</TabsTrigger>
      </TabsList>
      <TabsContent value="settings" className="m-2">
        <TabSettings />
      </TabsContent>
      <TabsContent value="logic" className="m-2">
        <TabLogic />
      </TabsContent>
    </Tabs>
  );
}

function TabSettings() {
  const { currentScreen } = useFormBuilder();
  const type = currentScreen?.type;
  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-4">
        <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Tipo de pergunta
        </h1>
        <SelectInputType />
      </section>

      {type !== "statement" && (
        <section className="space-y-4">
          <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Configurações adicionais
          </h1>
          <SwitchSetting option="required" label="Obrigatório" />
          {type === "text" && (
            <>
              <SwitchSetting option="cpf" label="CPF" />
              <SwitchSetting option="email" label="E-mail" />
            </>
          )}
        </section>
      )}
    </div>
  );
}

function TabLogic() {
  const { currentScreen, currentScreenForm, screens } = useFormBuilder();
  const { control } = useFormContext<FormType>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `${currentScreenForm}.visible` as any,
  });

  return (
    <div>
      <header className="flex justify-between items-center">
        <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Lógicas
        </h1>
      </header>

      <div className="flex flex-col gap-4 mt-4">
        {currentScreen?.visible &&
          currentScreen?.visible.map((q, index) => (
            <div key={index} className="flex items-center justify-between mb-4">
              <div>
                <p className="font-bold">
                  Quando:{" "}
                  <span className="font-normal">
                    {screens.find((e) => e.screenKey === q.screenKey)?.title}
                  </span>
                </p>
                <p className="font-bold">
                  Condição:{" "}
                  <span className="font-normal">
                    {
                      queries[q.screenType].find((e) => e.value === q.query)
                        ?.label
                    }
                  </span>
                </p>
                <p className="font-bold">
                  Valor: <span className="font-normal">{q.value}</span>
                </p>
              </div>
              <div>
                <Button
                  type="button"
                  variant={"ghost"}
                  size={"icon"}
                  onClick={() => {
                    remove(index);
                  }}
                >
                  <Trash className="h-5 w-5 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
      </div>

      <div className="">
        <QueryBuilder availableScreens={screens} onSave={(q) => append(q)} />
      </div>
    </div>
  );
}

function SelectInputType() {
  const { currentScreenForm } = useFormBuilder();
  const { control, watch } = useFormContext<FormType>();
  const setting = (currentScreenForm + ".type") as any;
  const type = watch(setting);

  return (
    <FormField
      control={control}
      name={setting}
      render={({ field }) => (
        <FormItem>
          <Select onValueChange={field.onChange} value={type}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {inputOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center">
                    <span className="mr-2">
                      <Image
                        src={option.img}
                        width={25}
                        height={10}
                        priority
                        alt={`Pergunto do tipo: ${option.value}`}
                      />
                    </span>
                    {option.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
}

interface SwitchSettingProps {
  option: string;
  label: string;
}

function SwitchSetting({ option, label }: SwitchSettingProps) {
  const { currentScreenForm } = useFormBuilder();
  const { control, watch } = useFormContext<FormType>();
  const setting = (currentScreenForm + "." + option) as any;
  const required = watch(setting);

  return (
    <FormField
      control={control}
      name={setting}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <FormLabel className="text-sm">{label}</FormLabel>
          </div>
          <FormControl>
            <Switch checked={required} onCheckedChange={field.onChange} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

export function FormSettingsMobile() {
  const { currentScreen } = useFormBuilder();

  if (currentScreen?.type === "end") return null;

  return (
    <div className="xl:hidden">
      <Sheet>
        <SheetTrigger asChild className="mx-4 mt-4">
          <Button
            className="bg-accent text-accent-foreground hover:bg-accent/50"
            size={"icon"}
          >
            <Settings />
          </Button>
        </SheetTrigger>
        <SheetContent side={"right"} className="w-full p-0">
          <ScrollArea className="h-5/6">
            <div className="w-full my-16">
              <FormSettings />
            </div>
          </ScrollArea>
          <SheetFooter className="mt-8 mx-4">
            <SheetClose asChild>
              <Button type="submit">Concluir</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
