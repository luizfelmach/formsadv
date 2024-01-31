import { Dnd } from "@/components/dnd";
import { Button } from "@/components/ui/button";
import { Copy, Layers, MoreVertical, PlusCircle, Trash } from "lucide-react";
import { useFormBuilder } from "../providers";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormType, ScreenType } from "@/types";
import { DropResult } from "@hello-pangea/dnd";
import { v4 as uuid } from "uuid";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { inputOptions } from "../const";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";

export function NavbarScreenFormBuilder() {
  const { screens, endScreen, setScreen, currentScreen, setEndScreen } =
    useFormBuilder();

  const { control } = useFormContext<FormType>();
  const { swap } = useFieldArray({
    control,
    name: "screens",
  });

  function handleDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    setScreen(result.destination.index);
    swap(result.destination.index, result.source.index);
  }

  return (
    <nav className="mb-8">
      <header className="flex justify-between m-4 items-center">
        <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Perguntas
        </h1>
        <AppendOptions />
      </header>

      <section className="">
        <Dnd.Root onDragEnd={handleDragEnd}>
          <Dnd.Droppable
            droppableId="pages"
            direction="vertical"
            className="flex flex-col gap-2 mx-4 mt-8"
          >
            {screens.map((screen, index) => (
              <Dnd.Draggable
                draggableId={screen.screenKey}
                key={screen.screenKey}
                index={index}
              >
                <div
                  className={`bg-accent border border-foreground/5 rounded-sm min-h-12 p-4 flex justify-between items-center transition-colors ${
                    screen.screenKey === currentScreen?.screenKey
                      ? " border-l-8 border-l-primary"
                      : ""
                  }`}
                  onClick={() => {
                    setScreen(index);
                  }}
                >
                  <p className="text-foreground font-medium text-sm line-clamp-3">
                    {screen.title}
                  </p>
                  <div>
                    <ScreenOptions index={index} />
                  </div>
                </div>
              </Dnd.Draggable>
            ))}
          </Dnd.Droppable>
        </Dnd.Root>
      </section>

      <header className="flex justify-between m-4 items-center mt-8">
        <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Tela final
        </h1>
      </header>

      <section className="flex flex-col gap-2 mx-4 mt-8">
        <div
          className={`cursor-pointer bg-accent border border-foreground/5 rounded-sm min-h-12 p-4 flex justify-between items-center transition-colors ${
            endScreen.screenKey === currentScreen?.screenKey
              ? " border-l-8 border-l-primary"
              : ""
          }`}
          onClick={() => {
            setEndScreen();
          }}
        >
          <p className="text-foreground font-medium text-sm line-clamp-3">
            {endScreen.title}
          </p>
        </div>
      </section>
    </nav>
  );
}

function AppendOptions() {
  const { setScreen, screens } = useFormBuilder();
  const { control } = useFormContext<FormType>();
  const { append } = useFieldArray({ control, name: "screens" });

  function handleClick(type: string) {
    const screen: ScreenType = {
      screenKey: uuid(),
      type: type as any,
      title: "Sua pergunta aqui!",
      description: "",
      options: ["Opção 1", "Opção 2", "Opção 3"],
      required: false,
      cpf: false,
      email: false,
      visible: [],
    };
    append(screen);
    setScreen(screens.length);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <PlusCircle />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4">
        {inputOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => {
              handleClick(option.value);
            }}
          >
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
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ScreenOptions({ index }: { index: number }) {
  const { screens, deleteScreen } = useFormBuilder();
  const { control } = useFormContext<FormType>();
  const { append } = useFieldArray({ control, name: "screens" });
  const disabled = screens.length <= 1;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={(e) => {
            const screen = screens[index];
            append({
              ...screen!,
              title: screen?.title + " (Cópia)",
              screenKey: uuid(),
            });
            e.stopPropagation();
          }}
        >
          <Copy className="mr-2 h-4 w-4" />
          Duplicar
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={disabled}
          onClick={(e) => {
            deleteScreen(index);
            e.stopPropagation();
          }}
        >
          <Trash className="mr-2 h-4 w-4 text-destructive" />
          Apagar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function NavbarScreenFormBuilderMobile() {
  return (
    <div className="xl:hidden">
      <Sheet>
        <SheetTrigger asChild className="mx-4 mt-4">
          <Button
            className="bg-accent text-accent-foreground hover:bg-accent/50"
            size={"icon"}
          >
            <Layers />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"} className="w-full p-0">
          <ScrollArea className="h-5/6">
            <div className="w-full my-16">
              <NavbarScreenFormBuilder />
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
