import { Metadata } from "next";
import { authenticated } from "@/actions/authenticated";
import { Dashboard } from "@/components/pages/dashboard";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Meu Form | Dashboard",
  description: "Gerencie seus formulários.",
};

export default async function DashboardRoute() {
  if (!(await authenticated())) {
    redirect("/auth");
  }
  return <Dashboard forms={[]} />;
}
