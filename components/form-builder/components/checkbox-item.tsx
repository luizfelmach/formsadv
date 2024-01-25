import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { FormType } from "@/types";
import { UseControllerProps, useFormContext } from "react-hook-form";

interface CheckboxItemProps extends UseControllerProps<FormType> {
  title: string;
  description?: string;
}

export function CheckboxItem(props: CheckboxItemProps) {
  const { control, watch } = useFormContext<FormType>();
  const { name, title, description } = props;
  const value = watch(name);

  return (
    <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
      <FormControl>
        <Checkbox
          checked={value}
          onCheckedChange={(e) => {
            console.log(e);
          }}
        />
      </FormControl>
      <div className="space-y-1 leading-none">
        <FormLabel>{title}</FormLabel>
        <FormDescription>{description}</FormDescription>
      </div>
    </div>
  );
}
