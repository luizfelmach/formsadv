import { InputEntity, PageEntity } from "@/components/create-form/types";
import { useFormHandler } from "@/components/form-handler/hooks";
import { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";

interface UseRespondFormProps {
  pages: PageEntity[];
  inputs: InputEntity[];
}

export function useRespondForm(props: UseRespondFormProps) {
  const { pages, inputs } = props;
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [next, setNext] = useState<boolean>(false);
  const [finish, setFinish] = useState<boolean>(false);
  const [back, setBack] = useState<boolean>(false);
  const page = pages[currentPage];

  const visibleInputs = inputs.filter((e) => e.pageKey === page.pageKey);

  const methods = useFormHandler({
    inputs: visibleInputs,
  });

  const { trigger } = methods;

  const currentForm = useWatch({
    control: methods.control,
    name: visibleInputs.map((e) => e.inputKey),
  });

  useEffect(() => {
    async function run() {
      const hasNext = currentPage <= pages.length - 2;
      const hasError = await trigger(visibleInputs.map((e) => e.inputKey));
      setNext(hasNext && hasError);
      setFinish(!hasNext && hasError);
      setBack(currentPage > 0);
    }
    run();
  }, [currentPage, currentForm]);

  function visibleInput(inputKey: string) {
    const has = visibleInputs
      .map((e) => e.inputKey)
      .filter((e) => e === inputKey);
    return has.length > 0;
  }

  return {
    currentPage,
    setCurrentPage,
    next,
    back,
    finish,
    page,
    methods,
    visibleInput,
  };
}
