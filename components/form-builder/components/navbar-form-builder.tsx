import { Navbar, NavbarItem, NavbarLogo } from "@/components/navbar";
import { Button } from "../../ui/button";
import { Container } from "@/components/container";
import { Unlink2 } from "lucide-react";

export function NavbarFormBuilder() {
  return (
    <Navbar>
      <Container className="flex justify-between">
        <NavbarLogo />
        <NavbarItem className="gap-4">
          <Button
            className="h-9 bg-accent text-accent-foreground hover:bg-accent/50"
            size={"icon"}
          >
            <Unlink2 />
          </Button>
          <Button type="submit" className="h-9 font-bold">
            Publicar
          </Button>
        </NavbarItem>
      </Container>
    </Navbar>
  );
}
