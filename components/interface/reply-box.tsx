import { cn } from "@/lib/utils";
import { Container } from "../container";

interface ReplyBoxProps {
  children?: React.ReactNode;
  className?: string;
}

function ReplyBoxRoot({ children, className }: ReplyBoxProps) {
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

interface ReplyBoxHeaderProps {
  children?: React.ReactNode;
}

function ReplyBoxHeader({ children }: ReplyBoxHeaderProps) {
  return <header className="my-8 space-y-4">{children}</header>;
}

interface ReplyBoxTitleProps {
  children?: React.ReactNode;
}

function ReplyBoxTitle({ children }: ReplyBoxTitleProps) {
  return (
    <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl border-none focus:border-none resize-none">
      {children}
    </h1>
  );
}

interface ReplyBoxDescriptionProps {
  children?: React.ReactNode;
}

function ReplyBoxDescription({ children }: ReplyBoxDescriptionProps) {
  return (
    <h1 className="text-xl font-normal tracking-tight first:mt-0 border-none focus:border-none resize-none overflow-hidden h-auto">
      {children}
    </h1>
  );
}

interface ReplyBoxInputProps {
  children?: React.ReactNode;
}

function ReplyBoxInput({ children }: ReplyBoxInputProps) {
  return <div>{children}</div>;
}

interface ReplyBoxFooterProps {
  children?: React.ReactNode;
}

function ReplyBoxFooter({ children }: ReplyBoxFooterProps) {
  return <div>{children}</div>;
}

export const ReplyBox = {
  Root: ReplyBoxRoot,
  Header: ReplyBoxHeader,
  Title: ReplyBoxTitle,
  Description: ReplyBoxDescription,
  Input: ReplyBoxInput,
  Footer: ReplyBoxFooter,
};
