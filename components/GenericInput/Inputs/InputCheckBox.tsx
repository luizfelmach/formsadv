import { UseControllerProps } from "react-hook-form";
import { CommonInputType } from "@/types";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

interface GenericInputProps extends UseControllerProps {
  inputProps: CommonInputType;
}

export function InputCheckBox(props: GenericInputProps) {
  const { inputProps, name, control, defaultValue } = props;
  const { type, isRequired, label, placeholder, options } = inputProps;
  return (
    <FormField
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={() => (
        <FormItem>
          <div className="mb-4">
            <FormLabel className="text-base">Sidebar</FormLabel>
          </div>
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
                      className="flex flex-row items-start space-x-3 space-y-0"
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
                      <FormLabel className="font-normal">
                        {option.value}
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
