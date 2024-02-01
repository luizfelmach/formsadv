import { Navbar, NavbarItem, NavbarLogo } from "@/components/navbar";
import { Button } from "../../ui/button";
import { Container } from "@/components/container";
import { MoveLeft, Unlink2 } from "lucide-react";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "sonner";
import { InputInline } from "@/components/module/inline-input";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";

export function NavbarFormBuilder() {
  const router = useRouter();
  const {
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();
  return (
    <Navbar>
      <div className="mx-4 h-full flex justify-between">
        <NavbarItem className="gap-4">
          <div>
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              <MoveLeft />
            </Button>
          </div>
          <div className="hidden sm:flex">
            <span className="font-bold">form/</span>
            <InputInline
              className={`bg-accent rounded-lg px-1 min-w-10 max-w-sm truncate transition-colors ${
                errors["name"] && "bg-destructive/40"
              }`}
              preventEnter
              onInput={(e) => {
                setValue("name", e.currentTarget.innerText);
              }}
              value={getValues("name")}
            />
          </div>
        </NavbarItem>
        <NavbarItem className="gap-4">
          <CopyToClipboard text="https://">
            <Button
              type="button"
              className="h-9 bg-accent text-accent-foreground hover:bg-accent/50"
              size={"icon"}
              onClick={() => {
                toast.info("Link copiado para a área de transferência.");
              }}
            >
              <Unlink2 />
            </Button>
          </CopyToClipboard>
          <Button type="submit" className="h-9 font-bold">
            Publicar
          </Button>
        </NavbarItem>
      </div>
    </Navbar>
  );
}
