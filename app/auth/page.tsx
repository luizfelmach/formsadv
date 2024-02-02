import { Metadata } from "next";
import { Auth } from "@/components/pages/auth";

export const metadata: Metadata = {
  title: "Meu Form | Autenticação",
  description: "Crie uma conta ou acesse a plataforma Meu Forms.",
};

export default function AuthRoute() {
  return <Auth />;
}
