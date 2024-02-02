"use server";

import { api } from "@/services/api";

export async function authenticated() {
  const result = await api
    .get("costumer")
    .then(() => true)
    .catch(() => false);
  return result;
}
