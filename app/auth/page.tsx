import { Metadata } from "next";
import { Auth } from "@/components/pages/auth";
import { redirect } from "next/navigation";
import { authenticated } from "@/actions/authenticated";

export const metadata: Metadata = {
  title: "Meu Form | Autenticação",
  description: "Crie uma conta ou acesse a plataforma Meu Forms.",
};

export default async function AuthRoute() {
  if (await authenticated()) {
    redirect("/dashboard");
  }
  return <Auth />;
}
