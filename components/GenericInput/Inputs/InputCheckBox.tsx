import { UseControllerProps } from "react-hook-form";
import { InputCheckBoxEntity } from "@/types";
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
  inputProps: InputCheckBoxEntity;
}

export function InputCheckBox(props: Omit<GenericInputProps, "name">) {
  const { inputProps, control, defaultValue } = props;
  const { required: isRequired, label, options, inputKey } = inputProps;
  return (
    <FormField
      control={control}
      defaultValue={defaultValue}
      name={inputKey}
      render={() => (
        <FormItem>
          <FormLabel>
            {label}{" "}
            <span className="text-destructive">{isRequired && "*"}</span>{" "}
          </FormLabel>
          {options &&
            options.map((option) => (
              <FormField
                key={typeof option === "string" ? option : option.value}
                control={control}
                defaultValue={""}
                name={inputKey}
                render={({ field }) => {
                  return (
                    <FormItem
                      key={typeof option === "string" ? option : option.value}
                      className={cn(
                        "inline-flex items-center hover:opacity-70 active:opacity-50 justify-between flex-row-reverse tap-highlight-transparent",
                        "bg-foreground/5 rounded-lg gap-4 pr-4",
                        "flex space-x-3 space-y-0",
                        "data-[selected=true]:border-primary data-[selected=true]:border-2 min-h-14"
                      )}
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(
                            typeof option === "string" ? option : option.value
                          )}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([
                                  ...field.value,
                                  typeof option === "string"
                                    ? option
                                    : option.value,
                                ])
                              : field.onChange(
                                  field.value?.filter(
                                    (value: any) =>
                                      value !==
                                      (typeof option === "string"
                                        ? option
                                        : option.value)
                                  )
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="w-full min-h-14 flex items-center px-2 cursor-pointer">
                        <div className="space-y-3 py-2">
                          <span className="text-sm font-medium leading-none">
                            {typeof option === "string" ? option : option.value}
                          </span>
                          {typeof option === "object" && (
                            <p className="font-normal">{option.description}</p>
                          )}
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
