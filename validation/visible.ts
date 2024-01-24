import { ScreenType, ScreenVisibleQuery } from "@/components/types";

function evaluateScreenQuery(
  screenVisibleQuery: ScreenVisibleQuery,
  answers: Record<string, any>
): boolean {
  const { screenKey, query, value } = screenVisibleQuery;

  if (query === "equals") return value === answers[screenKey];
  if (query === "notEquals") return value !== answers[screenKey];
  if (query === "contains") return answers[screenKey].includes(value);
  if (query === "startsWith") return answers[screenKey].startsWith(value);
  if (query === "endsWith") return answers[screenKey].endsWith(value);
  if (query === "gt") return answers[screenKey] > value;
  if (query === "lt") return answers[screenKey] < value;
  if (query === "gte") return answers[screenKey] >= value;
  if (query === "lte") return answers[screenKey] <= value;

  throw new Error("Invalid query.");
}

export function screenVisible(
  screen: ScreenType,
  answers: Record<string, any>
) {
  if (!screen.visible) return true;

  let response = screen.visible
    .map((target) => evaluateScreenQuery(target, answers))
    .reduce((p, c) => p && c, true);

  return response;
}
