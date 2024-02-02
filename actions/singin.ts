"use server";

import { api } from "@/services/api";
import { cookies } from "next/headers";

export async function SignIn(data: { email: string; password: string }) {
  const response = await api.post("/auth/signin", {
    ...data,
  });
  const twoDay = 2 * 24 * 60 * 60 * 1000;
  cookies().set("token", response.data.token, {
    expires: Date.now() + twoDay,
  });
}
