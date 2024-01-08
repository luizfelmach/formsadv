import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

class GenerateId {
  private static counter: number = 0;
  private static save: Record<string, number> = {};

  static get(seed?: string): number {
    if (!seed) {
      GenerateId.counter += 1;
      return GenerateId.counter;
    }

    if (GenerateId.save[seed]) {
      return GenerateId.save[seed];
    }

    GenerateId.counter += 1;
    GenerateId.save[seed] = GenerateId.counter;
    return GenerateId.save[seed];
  }
}

export function generateId(seed?: string) {
  return GenerateId.get(seed).toString();
}
