import { FormType, ScreenType } from "@/components/types";
import { createSchema } from "@/validation/schema";
import { screenVisible } from "@/validation/visible";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface UseReplyFormProps {
  form: FormType;
}

export function useReplyForm({ form }: UseReplyFormProps) {
  const [screenIndex, setScreenIndex] = useState<number>(0);
  const [screens, setScreens] = useState<ScreenType[]>(form.screens);
  const [canProceed, setCanProceed] = useState<boolean>(false);
  const [canGoBack, setCanGoBack] = useState<boolean>(false);
  const [canComplete, setCanComplete] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const screen = form.screens[screenIndex];

  const schema = createSchema(screens);
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const { trigger, watch, getValues } = methods;

  async function handleNext() {
    const isValid = await trigger(screen.screenKey);
    if (!isValid) return;
    if (canProceed) setScreenIndex(screenIndex + 1);
  }

  const currentScreenInput = watch(screens[screenIndex].screenKey);

  function handleBack() {
    setScreenIndex(screenIndex - 1);
  }

  function handleComplete() {
    setCompleted(true);
    setCanProceed(false);
    setCanGoBack(false);
    setCanComplete(false);
    setScreenIndex(screenIndex + 1);
  }

  useEffect(() => {
    if (completed) return;
    const filtered = form.screens.filter((e) => screenVisible(e, getValues()));
    setScreens(filtered);
    const hasNext = screenIndex <= filtered.length - 3;
    setCanProceed(hasNext);
    setCanGoBack(screenIndex > 0);
    setCanComplete(!hasNext);
  }, [screenIndex, currentScreenInput]);

  return {
    canProceed,
    canGoBack,
    canComplete,
    completed,

    handleBack,
    handleNext,
    handleComplete,

    methods,

    screenIndex,
    screens,
  };
}
