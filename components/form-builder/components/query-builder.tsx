import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScreenType, ScreenVisibleQuery } from "@/types";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

interface QueryBuilderProps {
  availableScreens: ScreenType[];
  onSave: (q: ScreenVisibleQuery) => void;
}

const queries: Record<string, Array<{ label: string; value: string }>> = {
  text: [
    {
      label: "Igual a",
      value: "equals",
    },
    {
      label: "Diferente de",
      value: "notEquals",
    },
    {
      label: "Tem a palavra",
      value: "contains",
    },
    {
      label: "Inicia com a palavra",
      value: "startsWith",
    },
    {
      label: "Termina com a palavra",
      value: "endsWith",
    },
  ],
  textarea: [
    {
      label: "Igual a",
      value: "equals",
    },
    {
      label: "Diferente de",
      value: "notEquals",
    },
    {
      label: "Tem a palavra",
      value: "contains",
    },
    {
      label: "Inicia com a palavra",
      value: "startsWith",
    },
    {
      label: "Termina com a palavra",
      value: "endsWith",
    },
  ],
  number: [
    {
      label: "Igual a",
      value: "equals",
    },
    {
      label: "Diferente de",
      value: "notEquals",
    },
    {
      label: "Maior que",
      value: "gt",
    },
    {
      label: "Menor que",
      value: "lt",
    },
    {
      label: "Maior que ou igual a",
      value: "gte",
    },
    {
      label: "Menor que ou igual a",
      value: "lte",
    },
  ],
  radio: [
    {
      label: "Igual a",
      value: "equals",
    },
    {
      label: "Diferente de",
      value: "notEquals",
    },
    {
      label: "Tem a palavra",
      value: "contains",
    },
    {
      label: "Inicia com a palavra",
      value: "startsWith",
    },
    {
      label: "Termina com a palavra",
      value: "endsWith",
    },
  ],
  date: [
    {
      label: "Igual a",
      value: "equals",
    },
    {
      label: "Diferente de",
      value: "notEquals",
    },
    {
      label: "Maior que",
      value: "gt",
    },
    {
      label: "Menor que",
      value: "lt",
    },
    {
      label: "Maior que ou igual a",
      value: "gte",
    },
    {
      label: "Menor que ou igual a",
      value: "lte",
    },
  ],
} as const;

const initialState = {
  screenType: "",
  screenKey: "",
  query: "",
  value: "",
};

export function QueryBuilder(props: QueryBuilderProps) {
  const { availableScreens, onSave } = props;
  const [modal, setModal] = useState<boolean>(false);
  const [result, setResult] = useState<ScreenVisibleQuery>(
    initialState as ScreenVisibleQuery
  );

  if (!modal) {
    return (
      <Button
        className="border-4 border-dashed h-12 w-full"
        variant={"secondary"}
        onClick={() => setModal(true)}
      >
        Adicionar lógica
      </Button>
    );
  }

  const screens = availableScreens.filter(
    (screen) => screen.type !== "checkbox"
  );

  return (
    <div className="bg-accent border-4 border-dashed rounded-xl p-2 h-30 ">
      <div className="flex justify-end">
        <Button
          type="button"
          size={"icon"}
          variant={"secondary"}
          className="h-8 w-8"
          onClick={() => setModal(false)}
        >
          <Minus />
        </Button>
      </div>
      <section className="flex items-center justify-evenly mb-2 gap-2">
        <div className="flex-1">
          <Select
            onValueChange={(screenKey) => {
              const screen = screens.find((e) => e.screenKey === screenKey);
              setResult((prev) => {
                return {
                  ...prev,
                  screenKey,
                  screenType: screen!.type,
                };
              });
            }}
          >
            <SelectTrigger className="h-14">
              <SelectValue placeholder="Pergunta" />
            </SelectTrigger>
            <SelectContent>
              {screens.map((screen, index) => (
                <SelectItem value={screen.screenKey} key={index}>
                  {screen.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="">
          <Select
            disabled={(result.screenType as any) === ""}
            onValueChange={(screenQuery) => {
              setResult((prev) => {
                return {
                  ...prev,
                  query: screenQuery as any,
                };
              });
            }}
          >
            <SelectTrigger className="h-14">
              <SelectValue placeholder="Pergunta" />
            </SelectTrigger>
            <SelectContent>
              {queries[result.screenType] &&
                queries[result.screenType].map((q, index) => (
                  <SelectItem key={index} value={q.value}>
                    {q.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div className="">
          <Input
            className="h-14"
            onChange={(e) => {
              setResult((prev) => {
                return {
                  ...prev,
                  value: e.target.value,
                };
              });
            }}
          />
        </div>
      </section>
      <div className="flex justify-center">
        <Button
          type="button"
          size={"icon"}
          variant={"outline"}
          className="h-8 w-8"
          onClick={() => {
            onSave(result);
            setModal(false);
          }}
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
}
