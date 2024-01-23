import { useFormHandler } from "@/components/form-handler/hooks";
import { FormType } from "@/components/types";
import { useEffect, useState } from "react";

interface UseReplyFormProps {
  form: FormType;
}

export function useReplyForm({ form }: UseReplyFormProps) {
  const [currentScreen, setCurrentScreen] = useState<number>(0);
  const [canProceed, setProceed] = useState<boolean>(false);
  const [canGoBack, setGoBack] = useState<boolean>(false);
  const [canComplete, setComplete] = useState<boolean>(false);
  const screen = form.screens[currentScreen];

  function handleNext() {
    setCurrentScreen(currentScreen + 1);
  }

  function handleBack() {
    setCurrentScreen(currentScreen - 1);
  }

  useEffect(() => {
    const hasNext = currentScreen <= form.screens.length - 2;
    setProceed(hasNext);
    setGoBack(currentScreen > 0);
    setComplete(!hasNext);
  }, [currentScreen]);

  return {
    currentScreen,
    canProceed,
    canGoBack,
    canComplete,
    screen,
    handleBack,
    handleNext,
  };
}
