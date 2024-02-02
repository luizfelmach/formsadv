import { isAuthenticated } from "@/actions";
import { Dashboard } from "@/components/pages/dashboard";
import { redirect } from "next/navigation";

export default async function DashboardRoute() {
  //if (!(await isAuthenticated())) {
  //  redirect("/auth");
  //}
  return <Dashboard forms={[]} />;
}
