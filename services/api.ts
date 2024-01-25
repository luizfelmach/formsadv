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
