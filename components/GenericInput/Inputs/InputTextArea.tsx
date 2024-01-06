import { UseControllerProps } from "react-hook-form";
import { CommonInputType } from "@/types";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface GenericInputProps extends UseControllerProps {
  inputProps: CommonInputType;
}

export function InputTextArea(props: Omit<GenericInputProps, "name">) {
  const { inputProps, control, defaultValue } = props;
  const { inputKey, isRequired, label, placeholder } = inputProps;
  return (
    <FormField
      defaultValue={defaultValue}
      control={control}
      name={inputKey}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}{" "}
            <span className="text-destructive">{isRequired && "*"}</span>{" "}
          </FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
