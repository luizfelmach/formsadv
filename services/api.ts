import { env } from "@/config/env";
import { cookies } from "next/headers";
import axios from "axios";

export const api = axios.create({
  baseURL: env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  config.headers.set(
    "Authorization",
    `Bearer ${cookies().get("token")?.value}`
  );
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNREFUSED")
      throw new Error("Nossos servidores estão fora do ar. Tente novamente.");

    if (!error.response.data.message) {
      throw new Error("Algum erro desconhecido ocorreu. Tente novamente.");
    }
    throw new Error(error.response.data.message);
  }
);
