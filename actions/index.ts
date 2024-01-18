"use server";

import { api } from "@/services/api";
import { cookies } from "next/headers";

export async function isAuthenticated() {
  try {
    await api.get("costumer");
  } catch (err) {
    return false;
  }
  return true;
}

export async function Login(data: { email: string; password: string }) {
  try {
    const response = await api.post("/login", {
      ...data,
    });
    const twoDay = 2 * 24 * 60 * 60 * 1000;
    cookies().set("token", response.data.token, {
      expires: Date.now() + twoDay,
    });
  } catch (err) {
    return false;
  }
  return true;
}

export async function Logout() {
  cookies().delete("token");
}

export async function ForgotPass(data: { email: string }) {
  try {
    const response = await api.post("/forgot", {
      ...data,
    });
  } catch (err) {
    return false;
  }
  return true;
}

export async function handleClick(v: string) {
  //const response = await api.get("/costumer");
  //const res = await fetch("http://localhost:3001/login", {
  //  headers: {
  //    Accept: "application/json",
  //    "Content-Type": "application/json",
  //  },
  //  method: "POST",
  //  body: JSON.stringify({ email: "luizfelmach@gmail.com", password: v }),
  //});
  //if (!res.ok) {
  //  return;
  //}
  //const data = await res.json();
  //cookies().set({
  //  name: "token",
  //  value: data.token,
  //  httpOnly: true,
  //  sameSite: "strict",
  //  secure: true,
  //});
  //
  //const a = `Bearer ${cookies().get("token")?.value}`;
  //console.log(a);
  //
  //const l = await fetch("http://localhost:3001/costumer", {
  //  headers: {
  //    Authorization: `Bearer ${cookies().get("token")?.value}`,
  //  },
  //});
  //console.log(await l.json());
}
