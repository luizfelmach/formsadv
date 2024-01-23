import { UseControllerProps } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { ScreenType } from "../types";

interface GenericInputProps extends UseControllerProps {
  screen: ScreenType;
}

export function InputRadio(props: Omit<GenericInputProps, "name">) {
  const { screen, control, defaultValue } = props;
  const { screenKey, options } = screen;
  return (
    <FormField
      defaultValue={defaultValue}
      control={control}
      name={screenKey}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              {options &&
                options.map((option, index) => (
                  <FormItem
                    key={index}
                    className={cn(
                      "inline-flex items-center hover:opacity-70 active:opacity-50 justify-between flex-row-reverse tap-highlight-transparent",
                      "bg-foreground/5 rounded-lg gap-4 pr-4",
                      "data-[selected=true]:border-primary data-[selected=true]:border-2 min-h-12"
                    )}
                  >
                    <FormControl>
                      <RadioGroupItem value={option} />
                    </FormControl>
                    <FormLabel className="w-full min-h-12 flex items-center px-4 cursor-pointer">
                      <div className="space-y-3 py-2">
                        <span className="text-sm font-medium leading-none">
                          {option}
                        </span>
                      </div>
                    </FormLabel>
                  </FormItem>
                ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
