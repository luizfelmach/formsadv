import { UseControllerProps } from "react-hook-form";
import { InputCheckBoxSingleEntity } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface GenericInputProps extends UseControllerProps {
  inputProps: InputCheckBoxSingleEntity;
}

export function InputCheckBoxSingle(props: Omit<GenericInputProps, "name">) {
  const { inputProps, control, defaultValue } = props;
  const { required: isRequired, label, options, inputKey } = inputProps;
  return (
    <FormField
      control={control}
      defaultValue={defaultValue}
      name={inputKey}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>Use different settings for my mobile devices</FormLabel>
            <FormDescription>
              You can manage your mobile notifications in the page.
            </FormDescription>
          </div>
        </FormItem>
      )}
    />
  );
}
