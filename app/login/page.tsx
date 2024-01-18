import { isAuthenticated } from "@/actions";
import { ForgotPassword } from "@/components/forgot-pass";
import LoginForm from "@/components/login-form";
import { redirect } from "next/navigation";

export default async function Login() {
  if (await isAuthenticated()) {
    redirect("/dashboard");
  }
  return (
    <div className="flex justify-center items-center h-screen flex-col max-w-96 m-auto">
      <LoginForm />
    </div>
  );
}
