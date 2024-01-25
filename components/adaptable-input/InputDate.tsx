import { UseControllerProps } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ScreenType } from "../../types";
import { Input } from "../ui/input";

interface GenericInputProps extends UseControllerProps {
  screen: ScreenType;
}

export function InputDate(props: Omit<GenericInputProps, "name">) {
  const { screen, control, defaultValue } = props;
  const { screenKey, type } = screen;
  return (
    <FormField
      defaultValue={defaultValue}
      control={control}
      name={screenKey}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormControl>
            <Input
              style={{
                boxShadow: "none",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
              }}
              className="w-full border-b-4 h-14 bg-accent focus:border-foreground/20 transition-colors"
              type={type}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
