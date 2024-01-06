import { UseControllerProps, useController } from "react-hook-form";
import { CommonInputType } from "@/types";
import { Input } from "@/components/ui/input";

interface GenericInputProps extends UseControllerProps {
  inputProps: CommonInputType;
}

export function InputText(props: GenericInputProps) {
  const { inputProps, name, control, defaultValue } = props;
  const { field } = useController({
    name,
    control,
    defaultValue,
  });
  return <Input {...field} />;
}
