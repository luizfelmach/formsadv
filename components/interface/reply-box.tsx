import { cn } from "@/lib/utils";
import { Container } from "../container";

interface ReplyBoxProps {
  children?: React.ReactNode;
  className?: string;
}

export function ReplyBox({ children, className }: ReplyBoxProps) {
  return (
    <Container
      className={cn(
        "min-h-screen flex flex-col justify-center items-center",
        className
      )}
    >
      <div className="w-full">{children}</div>
    </Container>
  );
}
