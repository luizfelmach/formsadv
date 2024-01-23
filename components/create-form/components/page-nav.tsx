import { ScrollArea, ScrollBar } from "../../ui/scroll-area";
import { Button } from "../../ui/button";
import { GripHorizontal, Plus, Trash } from "lucide-react";
import { DropResult } from "@hello-pangea/dnd";
import { Dnd } from "../../dnd";
import { useCreateFormContext } from "../providers";
import { PageEntity } from "../types";

export function PageNav() {
  const { pageMethods } = useCreateFormContext();
  const { fields: pages } = pageMethods;

  function handleDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    pageMethods.swap(result.destination.index, result.source.index);
  }

  return (
    <div className="w-full fixed bottom-0">
      <nav className="w-full h-full flex justify-center px-4 bg-accent">
        <ScrollArea className="h-full  max-w-2xl whitespace-nowrap">
          <div className="flex h-full w-full space-x-4 p-4">
            <Dnd.Root onDragEnd={handleDragEnd}>
              <Dnd.Droppable
                droppableId="pages"
                className="flex gap-4"
                direction="horizontal"
              >
                {pages.map((page, index) => (
                  <Dnd.Draggable
                    draggableId={page.pageKey}
                    key={page.pageKey}
                    index={index}
                    lock="horizontal"
                  >
                    <SetPageButton key={index} page={page} />
                  </Dnd.Draggable>
                ))}
              </Dnd.Droppable>
            </Dnd.Root>
            <AppendButton />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </nav>
    </div>
  );
}

function AppendButton() {
  const { pageMethods, setCurrentPage } = useCreateFormContext();

  function handleClick() {
    const page = {
      pageKey: `${(Math.random() * 100) % 100}`,
      title: "Página #",
      subtitle: "Seu subtítulo para essa página.",
    };
    pageMethods.append(page);
    setCurrentPage(pageMethods.fields.length);
  }
  return (
    <Button
      type="button"
      variant={"outline"}
      className="h-24 w-40"
      onClick={handleClick}
    >
      <Plus />
    </Button>
  );
}

function SetPageButton({ page }: { page: PageEntity }) {
  const { pageMethods, setCurrentPage } = useCreateFormContext();
  return (
    <div className="h-24 bg-background flex flex-col justify-evenly items-center rounded-xl border hover:bg-black/0">
      <section className="self-end mr-2">
        <GripHorizontal size={18} />
      </section>

      <button
        className="w-40 fled flex-col"
        onClick={(e) => {
          const index = pageMethods.fields.findIndex(
            (e) => e.pageKey === page.pageKey
          );
          setCurrentPage(index);
        }}
      >
        <section className="flex self-center justify-center h-full">
          {page.title}
        </section>
      </button>

      <Button
        variant={"ghost"}
        className="h-6 m-0 p-0 mr-2 self-end"
        onClick={(e) => {
          e.stopPropagation();
          pageMethods.remove(
            pageMethods.fields.findIndex((e) => e.pageKey === page.pageKey)
          );
        }}
      >
        <Trash size={18} className="text-destructive" />
      </Button>
    </div>
  );
}
