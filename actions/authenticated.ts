"use server";

import { api } from "@/services/api";

export async function authenticated() {
  try {
    await api.get("costumer");
  } catch (err) {
    return false;
  }
  return true;
}
