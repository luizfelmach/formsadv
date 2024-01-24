import * as yup from "yup";
import { FormType, ScreenType } from "@/components/types";
import { ScreenEntity, parserScreenEntity } from "@/entity";
import { createSchema } from "@/validation/schema";
import { screenVisible } from "@/validation/visible";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface UseReplyFormProps {
  form: FormType;
}

export function useReplyForm({ form }: UseReplyFormProps) {
  const screensEntities = getScreensEntities(form.screens);

  const [screenIndex, setScreenIndex] = useState<number>(0);
  const [screens, setScreens] = useState<ScreenEntity[]>(screensEntities);
  const [canProceed, setCanProceed] = useState<boolean>(false);
  const [canGoBack, setCanGoBack] = useState<boolean>(false);
  const [canComplete, setCanComplete] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const screen = screens[screenIndex];

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(getScreensSchemas(screens)),
  });

  const { trigger, watch, getValues } = methods;
  const currentScreenWatch = watch(screens[screenIndex].screenKey);

  async function handleNext() {
    const isValid = await trigger(screen.screenKey);
    if (!isValid) return;
    if (canProceed) setScreenIndex(screenIndex + 1);
  }

  function handleBack() {
    if (canGoBack) setScreenIndex(screenIndex - 1);
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
    const visibles = screensEntities.filter((e) => e.isVisible(getValues()));
    setScreens(visibles);
    const hasNext = screenIndex <= visibles.length - 3;
    setCanProceed(hasNext);
    setCanGoBack(screenIndex > 0);
    setCanComplete(!hasNext);
  }, [screenIndex, currentScreenWatch]);

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

function getScreensEntities(screens: ScreenType[]): ScreenEntity[] {
  return screens.map((screen) => parserScreenEntity(screen));
}

function getScreensSchemas(screens: ScreenEntity[]) {
  const schemas = screens.map((screen) => [
    screen.screenKey,
    screen.getSchema(),
  ]);
  const schema = Object.fromEntries(schemas);
  return yup.object(schema);
}
