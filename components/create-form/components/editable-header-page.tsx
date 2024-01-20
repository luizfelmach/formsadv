import { Button } from "../../ui/button";
import { FormHandler } from "../../form-handler";
import { useCreateFormContext } from "../providers";
import { InputEntity } from "../types";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../ui/drawer";

export function EditableHeaderPage() {
  const { currentPage, pageMethods } = useCreateFormContext();

  const { fields, update } = pageMethods;

  const page = fields[currentPage!];
  const inputs: InputEntity[] = [
    {
      type: "text",
      label: "Novo título",
      defaultValue: page.title,
      inputKey: "title",
      pageKey: "x",
      required: true,
    },
    {
      type: "text",
      label: "Novo subtítulo",
      defaultValue: page.subtitle,
      inputKey: "subtitle",
      pageKey: "x",
    },
  ] as const;

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <header className="my-8 space-y-4">
          <h1 className="cursor-pointer scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl">
            {page.title}
          </h1>
          <h2 className="cursor-pointer scroll-m-20 border-b pb-2 text-xl font-normal tracking-tight first:mt-0">
            {page.subtitle}
          </h2>
        </header>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Edite o cabeçalho da página.</DrawerTitle>
          </DrawerHeader>
        </div>

        <div className="flex justify-center">
          <FormHandler.Root
            inputs={inputs}
            handleSubmit={(data) => {
              update(currentPage!, {
                pageKey: page.pageKey,
                title: data.title,
                subtitle: data.subtitle,
              });
            }}
          >
            <FormHandler.Inputs />
            <DrawerFooter>
              <Button className="w-96" type="submit">
                Atualizar
              </Button>
            </DrawerFooter>
          </FormHandler.Root>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
