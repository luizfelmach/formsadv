import { ScreenVisibleQuery } from "@/types";

type QueryFn = (defined: any, answer: any) => boolean;

const QueriesText: Record<string, QueryFn> = {
  equals: (defined: any, answer: any) => defined === answer,
  notEquals: (defined: any, answer: any) => defined !== answer,
  contains: (defined: any, answer: any) => answer.contains(defined),
  startsWith: (defined: any, answer: any) => answer.startsWith(defined),
  endsWith: (defined: any, answer: any) => answer.endsWith(defined),
};

const QueriesNumber: Record<string, QueryFn> = {
  equals: (defined: any, answer: any) => defined === answer,
  notEquals: (defined: any, answer: any) => defined !== answer,
  lt: (defined: any, answer: any) => defined > answer,
  gt: (defined: any, answer: any) => defined < answer,
  gte: (defined: any, answer: any) => defined <= answer,
  lte: (defined: any, answer: any) => defined >= answer,
};

const QueriesDate: Record<string, QueryFn> = {
  equals: (defined: any, answer: any) => defined.getTime() === answer.getTime(),
  notEquals: (defined: any, answer: any) =>
    defined.getTime() !== answer.getTime(),
  lt: (defined: any, answer: any) => defined.getTime() > answer.getTime(),
  gt: (defined: any, answer: any) => defined.getTime() < answer.getTime(),
  gte: (defined: any, answer: any) => defined.getTime() <= answer.getTime(),
  lte: (defined: any, answer: any) => defined.getTime() >= answer.getTime(),
};

const QueriesCheckBox: Record<string, QueryFn> = {
  has: (defined: any, answer: any) => answer.includes(defined),
};
export function QueryValidate(
  q: ScreenVisibleQuery,
  answers: Record<string, any>
) {
  const { screenKey, screenType, query, value } = q;

  if (screenType === "text") {
    let v1 = String(value);
    let v2 = String(answers[screenKey]);
    return QueriesText[query](v1, v2);
  }

  if (screenType === "textarea") {
    let v1 = String(value);
    let v2 = String(answers[screenKey]);
    return QueriesText[query](v1, v2);
  }

  if (screenType === "number") {
    let v1 = Number(value);
    let v2 = Number(answers[screenKey]);
    return QueriesNumber[query](v1, v2);
  }

  if (screenType === "date") {
    let v1 = new Date(value);
    let v2 = new Date(answers[screenKey]);
    return QueriesDate[query](v1, v2);
  }

  if (screenType === "radio") {
    let v1 = String(value);
    let v2 = String(answers[screenKey]);
    return QueriesText[query](v1, v2);
  }

  if (screenType === "checkbox") {
    let v1 = String(value);
    let v2 = answers[screenKey];
    return QueriesCheckBox[query](v1, v2);
  }
  return true;
}

export function QueryValidateAnd(
  q: ScreenVisibleQuery[],
  answers: Record<string, any>
) {
  const result = q
    .map((e) => QueryValidate(e, answers))
    .reduce((p, c) => p && c, true);
  return result;
}
