"use server";

import { api } from "@/services/api";

export async function SignUp(data: {
  name: string;
  email: string;
  password: string;
}) {
  await api.post("/costumer", {
    ...data,
  });
}
