import { UseControllerProps } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ScreenType } from "@/types";

interface GenericInputProps extends UseControllerProps {
  screen: ScreenType;
}

export function InputText(props: Omit<GenericInputProps, "name">) {
  const { screen, control, defaultValue } = props;
  const { screenKey, type } = screen;
  return (
    <FormField
      defaultValue={defaultValue}
      control={control}
      name={screenKey}
      render={({ field }) => (
        <FormItem>
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
