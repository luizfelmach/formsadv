"use client";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area";
import { Button } from "../../ui/button";
import { GripHorizontal, Plus, Trash } from "lucide-react";
import { DropResult } from "@hello-pangea/dnd";
import { Dnd } from "../../dnd";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormType, ScreenType } from "@/types";
import { v4 as uuid } from "uuid";
import { useFormBuilder } from "../providers";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";

export function FormBuilderScreenNav() {
  const { screens, endScreen, setScreen } = useFormBuilder();

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
    swap(result.destination.index, result.source.index);
  }

  return (
    <div
      className="w-fu
    swap(result.destination.index, result.source.index);
  }ll"
    >
      <nav className="w-full h-full flex justify-center px-4 bg-accent">
        <ScrollArea className="h-full  max-w-2xl whitespace-nowrap">
          <div className="flex h-full w-full space-x-4 p-4">
            <Dnd.Root onDragEnd={handleDragEnd}>
              <Dnd.Droppable
                droppableId="pages"
                className="flex gap-4"
                direction="horizontal"
              >
                {screens.map((screen, index) => (
                  <Dnd.Draggable
                    draggableId={screen.screenKey}
                    key={screen.screenKey}
                    index={index}
                    lock="horizontal"
                    dragArea={false}
                  >
                    <SetScreenButton key={index} screen={screen} />
                  </Dnd.Draggable>
                ))}
              </Dnd.Droppable>
            </Dnd.Root>
            <div className="h-24 bg-background flex justify-evenly items-center rounded-xl border hover:bg-black/0">
              <button
                type="button"
                className="w-40 fled flex-col p-8"
                onClick={(e) => {
                  setScreen(endScreen);
                }}
              >
                <section className="flex self-center justify-center h-full">
                  <TruncatedText text={endScreen.title} />
                </section>
              </button>
            </div>
            <AppendButton />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </nav>
    </div>
  );
}

function AppendButton() {
  const [modal, setModal] = useState<boolean>(false);
  const { setScreen } = useFormBuilder();
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
    setScreen(screen);
    setModal(false);
  }
  return (
    <Dialog open={modal} onOpenChange={(o) => setModal(o)}>
      <DialogTrigger asChild>
        <Button type="button" variant={"outline"} className="h-24 w-40">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-xl">
        <DialogHeader>
          <DialogTitle>Adicione alguma tela ao seu formulário</DialogTitle>
        </DialogHeader>

        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            handleClick("text");
          }}
        >
          Texto
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            handleClick("textarea");
          }}
        >
          Bloco de texto
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            handleClick("date");
          }}
        >
          Data
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            handleClick("number");
          }}
        >
          Número
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            handleClick("radio");
          }}
        >
          Escolha única
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            handleClick("statement");
          }}
        >
          Separar por seção
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            handleClick("checkbox");
          }}
        >
          Múltiplas escolhas
        </Button>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Fechar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function SetScreenButton({ screen }: { screen: ScreenType }) {
  const { setScreen } = useFormBuilder();

  return (
    <div className="h-24 bg-background flex justify-evenly items-center rounded-xl border hover:bg-black/0">
      <button
        type="button"
        className="w-40 fled flex-col p-8"
        onClick={(e) => {
          setScreen(screen);
        }}
      >
        <section className="flex self-center justify-center h-full">
          <TruncatedText text={screen.title} />
        </section>
      </button>
      <Dnd.dragArea>
        <section className="self-end mr-2">
          <GripHorizontal size={18} />
        </section>
      </Dnd.dragArea>
    </div>
  );
}

function TruncatedText({ text }: { text: string }) {
  return (
    <div className="max-w-24">
      <p className="truncate">{text}</p>
    </div>
  );
}
