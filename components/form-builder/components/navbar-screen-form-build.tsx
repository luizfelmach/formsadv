import { Dnd } from "@/components/dnd";
import { Button } from "@/components/ui/button";
import { Circle, Copy, MoreVertical, PlusCircle, Trash } from "lucide-react";
import { useFormBuilder } from "../providers";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormType, ScreenType } from "@/types";
import { DropResult } from "@hello-pangea/dnd";
import { v4 as uuid } from "uuid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export function NavbarScreenFormBuilder() {
  const { screens, endScreen, setScreen } = useFormBuilder();

  const { control } = useFormContext<FormType>();
  const { swap, append } = useFieldArray({
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
    swap(result.destination.index, result.source.index);
  }

  return (
    <nav>
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
                  className="bg-accent border border-foreground/5 rounded-sm min-h-12 p-4 flex justify-between items-center"
                  onClick={() => {
                    setScreen(screen);
                  }}
                >
                  <p className="text-foreground font-medium text-sm line-clamp-3">
                    {screen.title}
                  </p>
                  <div>
                    <ScreenOptions screenKey={screen.screenKey} />
                  </div>
                </div>
              </Dnd.Draggable>
            ))}
          </Dnd.Droppable>
        </Dnd.Root>
      </section>
    </nav>
  );
}

const options = [
  { value: "text", label: "Texto", img: "/input-type/text.svg" },
  {
    value: "textarea",
    label: "Bloco de texto",
    img: "/input-type/textarea.svg",
  },
  { value: "number", label: "Número", img: "/input-type/number.svg" },
  { value: "date", label: "Data", img: "/input-type/date.svg" },
  {
    value: "checkbox",
    label: "Múltipla escolha",
    img: "/input-type/checkbox.svg",
  },
  { value: "radio", label: "Única escolha", img: "/input-type/radio.svg" },
  { value: "statement", label: "Separador", img: "/input-type/statement.svg" },
] as const;

function AppendOptions() {
  const { control } = useFormContext<FormType>();
  const { append } = useFieldArray({
    control,
    name: "screens",
  });

  function handleClick(type: string) {
    const screen: ScreenType = {
      screenKey: uuid(),
      type: type as any,
      title: "Sua pergunta aqui!",
      description: "",
      options: ["Opção 1", "Opção 2", "Opção 3"],
    };
    append(screen);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <PlusCircle />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {options.map((option) => (
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

function ScreenOptions({ screenKey }: { screenKey: string }) {
  const { screens } = useFormBuilder();

  const { control } = useFormContext<FormType>();
  const { remove, append } = useFieldArray({
    control,
    name: "screens",
  });

  const disabled = screens.length <= 1;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            const screen = screens.find((e) => e.screenKey === screenKey);
            append({
              ...screen!,
              title: screen?.title + " (Cópia)",
              screenKey: uuid(),
            });
          }}
        >
          <Copy className="mr-2 h-4 w-4" />
          Duplicar
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={disabled}
          onClick={() => {
            const index = screens.findIndex((e) => e.screenKey === screenKey);
            remove(index);
          }}
        >
          <Trash className="mr-2 h-4 w-4 text-destructive" />
          Apagar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
