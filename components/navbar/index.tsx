import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HTMLAttributes } from "react";

interface NavbarProps extends HTMLAttributes<HTMLDivElement> {}

export function Navbar({ children, className, ...props }: NavbarProps) {
  return (
    <nav className={cn("h-12 shadow-sm", className)} {...props}>
      {children}
    </nav>
  );
}

interface NavbarItemProps extends HTMLAttributes<HTMLDivElement> {}

export function NavbarItem({ children, className, ...props }: NavbarItemProps) {
  return (
    <section
      className={cn("flex items-center h-full mx-4", className)}
      {...props}
    >
      {children}
    </section>
  );
}

export function NavbarLogo() {
  const router = useRouter();
  return (
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
  );
}
