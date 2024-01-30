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
import { Settings } from "lucide-react";
import { inputOptions } from "../const";
import Image from "next/image";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormType } from "@/types";
import { useFormBuilder } from "../providers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      <TabsContent value="logic"></TabsContent>
    </Tabs>
  );
}

function TabSettings() {
  const { currentScreen, currentScreenIndex } = useFormBuilder();
  const { control } = useFormContext<FormType>();
  const { update } = useFieldArray({
    control,
    name: "screens",
  });

  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-4">
        <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Tipo de pergunta
        </h1>
        <Select
          onValueChange={(e) => {
            update(currentScreenIndex, {
              ...currentScreen!,
              type: e as any,
            });
          }}
          defaultValue={currentScreen?.type}
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {inputOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex">
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
      </section>

      <section className="space-y-4">
        <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Configurações adicionais
        </h1>
        <FormField
          control={control}
          name={`screens.0.type`}
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {inputOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex">
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
      </section>
    </div>
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
        <SheetContent side={"right"} className="w-full">
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
