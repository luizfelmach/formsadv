import { UseControllerProps } from "react-hook-form";
import { CommonInputType } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface GenericInputProps extends UseControllerProps {
  inputProps: CommonInputType;
}

export function InputCheckBox(props: GenericInputProps) {
  const { inputProps, name, control, defaultValue } = props;
  const { isRequired, label, options } = inputProps;
  return (
    <FormField
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel>
            {label}{" "}
            <span className="text-destructive">{isRequired && "*"}</span>{" "}
          </FormLabel>
          {options &&
            options.map((option) => (
              <FormField
                key={option.value}
                control={control}
                defaultValue={""}
                name={name}
                render={({ field }) => {
                  return (
                    <FormItem
                      key={option.value}
                      className={cn(
                        "inline-flex items-center hover:opacity-70 active:opacity-50 justify-between flex-row-reverse tap-highlight-transparent",
                        "bg-foreground/5 rounded-lg gap-4 pr-4",
                        "flex space-x-3 space-y-0",
                        "data-[selected=true]:border-primary data-[selected=true]:border-2 min-h-12"
                      )}
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(option.value)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, option.value])
                              : field.onChange(
                                  field.value?.filter(
                                    (value: any) => value !== option.value
                                  )
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="w-full min-h-12 flex items-center px-2">
                        <div className="space-y-3 py-2">
                          <span className="text-sm font-medium leading-none">
                            {option.value}
                          </span>
                          <p className="font-normal">{option.description}</p>
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
