import { isAuthenticated } from "@/actions";
import { Dashboard } from "@/components/dashboard";
import { redirect } from "next/navigation";

export default async function () {
  if (!(await isAuthenticated())) {
    redirect("/login");
  }
  return (
    <div>
      <Dashboard />
    </div>
  );
}
