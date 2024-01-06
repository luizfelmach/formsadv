import { UseControllerProps } from "react-hook-form";
import { CommonInputType } from "@/types";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface GenericInputProps extends UseControllerProps {
  inputProps: CommonInputType;
}

export function InputRadio(props: GenericInputProps) {
  const { inputProps, name, control, defaultValue } = props;
  const { type, isRequired, label, placeholder, options } = inputProps;
  return (
    <FormField
      defaultValue={defaultValue}
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>
            {label}{" "}
            <span className="text-destructive">{isRequired && "*"}</span>{" "}
          </FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              {options &&
                options.map((options, index) => (
                  <FormItem
                    key={index}
                    className={cn(
                      "inline-flex items-center hover:opacity-70 active:opacity-50 justify-between flex-row-reverse tap-highlight-transparent",
                      "bg-foreground/5 rounded-lg gap-4 pr-4",
                      "data-[selected=true]:border-primary data-[selected=true]:border-2 min-h-12"
                    )}
                  >
                    <FormControl>
                      <RadioGroupItem value={options.value} />
                    </FormControl>
                    <FormLabel className="w-full min-h-12 flex items-center px-4">
                      <div className="space-y-3 py-2">
                        <span className="text-sm font-medium leading-none">
                          {options.value}
                        </span>
                        <p className="font-normal">{options.description}</p>
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
