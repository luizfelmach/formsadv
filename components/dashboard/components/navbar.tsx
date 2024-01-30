import { Navbar, NavbarItem, NavbarLogo } from "@/components/navbar";
import { Logout } from "@/actions";
import { Container } from "@/components/container";
import { CreditCard, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NavbarDashboard() {
  return (
    <Navbar>
      <Container className="flex justify-between">
        <NavbarLogo />
        <NavbarItem>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="h-9 w-9 bg-accent flex items-center justify-center rounded-full">
                <User className="h-5 w-5" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background mr-4">
              <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4 text-success" />
                <span>Pagamento</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  Logout();
                }}
              >
                <LogOut className="mr-2 h-4 w-4 text-destructive" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </NavbarItem>
      </Container>
    </Navbar>
  );
}
