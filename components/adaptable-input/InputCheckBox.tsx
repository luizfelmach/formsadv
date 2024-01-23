import { UseControllerProps } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScreenType } from "../types";

interface GenericInputProps extends UseControllerProps {
  screen: ScreenType;
}

export function InputCheckBox(props: Omit<GenericInputProps, "name">) {
  const { screen, control, defaultValue } = props;
  const { options, screenKey } = screen;
  return (
    <FormField
      control={control}
      defaultValue={defaultValue}
      name={screenKey}
      render={() => (
        <FormItem>
          {options.map((option) => (
            <FormField
              key={option}
              control={control}
              defaultValue={""}
              name={screenKey}
              render={({ field }) => {
                return (
                  <FormItem
                    key={option}
                    className={cn(
                      "inline-flex items-center hover:opacity-70 active:opacity-50 justify-between flex-row-reverse tap-highlight-transparent",
                      "bg-foreground/5 rounded-lg gap-4 pr-4",
                      "flex space-x-3 space-y-0",
                      "data-[selected=true]:border-primary data-[selected=true]:border-2 min-h-14"
                    )}
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(option)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, option])
                            : field.onChange(
                                field.value?.filter(
                                  (value: any) => value !== option
                                )
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="w-full min-h-14 flex items-center px-2 cursor-pointer">
                      <div className="space-y-3 py-2">
                        <span className="text-sm font-medium leading-none">
                          {option}
                        </span>
                      </div>
                    </FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
