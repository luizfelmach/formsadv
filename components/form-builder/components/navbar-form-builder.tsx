import { Navbar, NavbarItem, NavbarLogo } from "@/components/navbar";
import { Button } from "../../ui/button";
import { Container } from "@/components/container";
import { Unlink2 } from "lucide-react";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "sonner";

export function NavbarFormBuilder() {
  return (
    <Navbar>
      <div className="mx-4 h-full flex justify-between">
        <NavbarLogo />
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
