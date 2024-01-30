import { Logout } from "@/actions";
import { Container } from "@/components/container";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreditCard, LogOut, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function Navbar() {
  const router = useRouter();
  return (
    <nav className="h-12 shadow-sm">
      <Container className="flex justify-between">
        <section className="flex items-center h-full">
          <Image
            alt="MeuForm Logo"
            width={70}
            height={20}
            src={"/logo-brand.svg"}
            className="cursor-pointer"
            priority
            onClick={() => {
              router.push("/");
            }}
          />
        </section>
        <section className="flex items-center h-full">
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
        </section>
      </Container>
    </nav>
  );
}
