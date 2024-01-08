import { FormPageEntity, InputEntity } from "@/types";

type InputResponse = InputEntity & { answer: string };

type ResponseType = FormPageEntity & {
  inputs: InputResponse[];
};

export function createResponse(
  data: Record<string, any>,
  forms: FormPageEntity[]
): ResponseType[] {
  const response: ResponseType[] = [];

  forms.forEach(({ title, subtitle, inputs }) => {
    const inputsReponse: InputResponse[] = inputs.map((input) => {
      return {
        answer: data[input.inputKey],
        ...input,
      };
    });
    response.push({
      title,
      subtitle,
      inputs: inputsReponse,
    });
  });

  return response;
}
