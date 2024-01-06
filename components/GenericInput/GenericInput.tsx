import { UseControllerProps, useController } from "react-hook-form";
import { CommonInputType } from "@/types";

interface GenericInputProps extends UseControllerProps {
  inputProps: CommonInputType;
}

export function GenericInput({ inputProps, name, control }: GenericInputProps) {
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });

  return (
    <div>
      <input type="text" {...field} />
    </div>
  );
}
