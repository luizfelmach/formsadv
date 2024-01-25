import * as yup from "yup";
import { ScreenType } from "@/types";

export interface ScreenEntity extends ScreenType {
  getSchema: () => yup.AnySchema;
  isVisible: (answers: Record<string, any>) => boolean;
}

export * from "./screen-checkbox";
export * from "./screen-date";
export * from "./screen-number";
export * from "./screen-radio";
export * from "./screen-text";
export * from "./screen-text-area";
export * from "./screen-end";
export * from "./screen-statement";
export * from "./parser";
