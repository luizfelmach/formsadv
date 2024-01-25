import { useFormBuilder } from "../providers";
import { WithoutScreen } from "../components/without-screen";
import { EditableHeaderForm } from "../components/editable-header-form";
import { TextEditor } from "./text-editor";
import { Container } from "@/components/container";
import { CheckBoxEditor } from "./checkbox-editor";
import { TextAreaEditor } from "./text-area-editor";
import { RadioEditor } from "./radio-editor";
import { DateEditor } from "./date-editor";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogicTab } from "../components/logic-tab";

export function ScreenEditor() {
  const { currentScreen, deleteScreen } = useFormBuilder();
  if (currentScreen === null) return <WithoutScreen />;
  const type = currentScreen.type;
  return (
    <Tabs defaultValue="content">
      <TabsList className="flex justify-center">
        <TabsTrigger value="content">Conteúdo</TabsTrigger>
        {currentScreen.type !== "end" && (
          <TabsTrigger value="logic">Lógica</TabsTrigger>
        )}
      </TabsList>
      <TabsContent value="content">
        <div className="min-h-screen flex flex-col justify-center items-center">
          {currentScreen.type !== "end" && (
            <Button
              className="self-end"
              variant={"outline"}
              onClick={() => deleteScreen(currentScreen.screenKey)}
            >
              <Trash />
            </Button>
          )}
          <Container>
            <EditableHeaderForm />
            <section className="w-full">
              {type === "statement"}
              {type === "end"}
              {type === "text" && <TextEditor />}
              {type === "textarea" && <TextAreaEditor />}
              {type === "number" && <TextEditor />}
              {type === "date" && <DateEditor />}
              {type === "radio" && <RadioEditor />}
              {type === "checkbox" && <CheckBoxEditor />}
            </section>
          </Container>
        </div>
      </TabsContent>
      <TabsContent value="logic">
        <LogicTab />
      </TabsContent>
    </Tabs>
  );
}
