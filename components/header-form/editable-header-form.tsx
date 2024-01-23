interface EditableHeaderFormProps {
  title: string;
  subtitle: string;
}

export function HeaderForm(props: EditableHeaderFormProps) {
  const { title, subtitle } = props;

  return (
    <header className="my-8 space-y-4">
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl">
        {title}
      </h1>
      <h2 className="scroll-m-20 border-b pb-2 text-xl font-normal tracking-tight first:mt-0">
        {subtitle}
      </h2>
    </header>
  );
}
