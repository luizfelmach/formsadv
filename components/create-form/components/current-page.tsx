import { Container } from "@/components/container";
import { EditableHeaderPage, EmptyPage, InputHandler, InputsNav } from ".";
import { useCreateFormContext } from "../providers";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CurrentPage() {
  const { currentPage } = useCreateFormContext();
  if (currentPage === null) return <EmptyPage />;
  return (
    <>
      <EditableHeaderPage />
      <Container>
        <InputsNav />
      </Container>
      <InputHandler>
        <Button className="w-full my-16 mb-32">
          <Plus />
        </Button>
      </InputHandler>
    </>
  );
}
