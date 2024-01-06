import { UseControllerProps, useController } from "react-hook-form";
import { CommonInputType } from "@/types";
import { Input } from "@/components/ui/input";
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

export function InputText(props: GenericInputProps) {
  const { inputProps, name, control, defaultValue } = props;
  const { inputKey, type, isRequired, label, placeholder } = inputProps;
  const { field } = useController({
    name,
    control,
    defaultValue,
  });
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
