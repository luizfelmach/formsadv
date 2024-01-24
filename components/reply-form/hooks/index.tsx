import { FormType } from "@/components/types";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

interface UseReplyFormProps {
  form: FormType;
}

export function useReplyForm({ form }: UseReplyFormProps) {
  const [currentScreen, setCurrentScreen] = useState<number>(0);
  const [canProceed, setCanProceed] = useState<boolean>(false);
  const [canGoBack, setCanGoBack] = useState<boolean>(false);
  const [canComplete, setCanComplete] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const screen = form.screens[currentScreen];

  async function handleNext() {
    if (canProceed) setCurrentScreen(currentScreen + 1);
  }

  function handleBack() {
    setCurrentScreen(currentScreen - 1);
  }

  function handleComplete() {
    setCompleted(true);
    setCanProceed(false);
    setCanGoBack(false);
    setCanComplete(false);
    setCurrentScreen(currentScreen + 1);
  }

  useEffect(() => {
    if (completed) return;
    const hasNext = currentScreen <= form.screens.length - 3;
    setCanProceed(hasNext);
    setCanGoBack(currentScreen > 0);
    setCanComplete(!hasNext);
  }, [currentScreen]);

  return {
    currentScreen,
    canProceed,
    canGoBack,
    canComplete,
    screen,
    handleBack,
    handleNext,
    completed,
    handleComplete,
  };
}
