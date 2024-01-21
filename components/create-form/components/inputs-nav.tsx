import { FormProvider, useForm } from "react-hook-form";
import { useCreateFormContext } from "../providers";
import { GenericInput } from "@/components/generic-input";
import { GripVertical, Pencil, Trash } from "lucide-react";
import { Dnd } from "@/components/dnd";
import { Button } from "@/components/ui/button";
import { DropResult } from "@hello-pangea/dnd";
import { InputHandler } from ".";

export function InputsNav() {
  const fakeForm = useForm();
  const { inputMethods, pageMethods, currentPage, getCurrentPage } =
    useCreateFormContext();
  const { fields: inputs, swap, remove } = inputMethods;

  function handleDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    swap(result.destination.index, result.source.index);
  }

  const pageInputs = inputs.filter(
    (input) => input.pageKey === getCurrentPage().pageKey
  );

  return (
    <div>
      <FormProvider {...fakeForm}>
        <Dnd.Root onDragEnd={handleDragEnd}>
          <Dnd.Droppable
            droppableId="inputs"
            direction="vertical"
            className="space-y-4"
          >
            {pageInputs.map((input, index) => (
              <Dnd.Draggable
                draggableId={input.inputKey}
                index={index}
                key={input.inputKey}
                lock="vertical"
                dragArea={false}
              >
                <div
                  key={index}
                  className="flex items-center w-full gap-4 border p-4 rounded-xl bg-accent"
                >
                  <div className="flex-1">
                    <GenericInput
                      inputProps={input}
                      control={fakeForm.control}
                      defaultValue={""}
                    />
                  </div>
                  <div>
                    <InputHandler input={input}>
                      <Button variant={"ghost"} size={"icon"}>
                        <Pencil />
                      </Button>
                    </InputHandler>
                  </div>
                  <div>
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      onClick={() => {
                        const index = inputs.findIndex(
                          (e) => e.inputKey === input.inputKey
                        );
                        remove(index);
                      }}
                    >
                      <Trash />
                    </Button>
                  </div>
                  <div>
                    <Dnd.dragArea>
                      <Button variant={"ghost"} size={"icon"}>
                        <GripVertical />
                      </Button>
                    </Dnd.dragArea>
                  </div>
                </div>
              </Dnd.Draggable>
            ))}
          </Dnd.Droppable>
        </Dnd.Root>
      </FormProvider>
    </div>
  );
}
