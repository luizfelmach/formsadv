import { UseControllerProps } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ScreenType } from "../types";

interface GenericInputProps extends UseControllerProps {
  screen: ScreenType;
}

export function InputTextArea(props: Omit<GenericInputProps, "name">) {
  const { screen, control, defaultValue } = props;
  const { screenKey } = screen;
  return (
    <FormField
      defaultValue={defaultValue}
      control={control}
      name={screenKey}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Textarea
              style={{
                boxShadow: "none",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
              }}
              className="w-full border-b-4 h-14 bg-accent focus:border-foreground/20 transition-colors"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
