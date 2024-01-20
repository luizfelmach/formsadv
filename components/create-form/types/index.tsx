import { InputEntity as Temp } from "@/types";

export type PageEntity = { pageKey: string; title: string; subtitle: string };
export type InputEntity = { pageKey: string } & Temp;
