interface ReplyFormHeaderProps {
  title: string;
  description?: string;
}

export function ReplyFormHeader(props: ReplyFormHeaderProps) {
  const { title, description } = props;

  return (
    <header className="my-8 space-y-4">
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl">
        {title}
      </h1>
      <h2 className="scroll-m-20 pb-2  text-xl font-normal tracking-tight first:mt-0">
        {description}
      </h2>
    </header>
  );
}
