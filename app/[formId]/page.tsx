import { notFound } from "next/navigation";

type paramsProps = {
  formId: string;
};

interface PageProps {
  params: paramsProps;
}

export default async function Page({ params }: PageProps) {
  const { formId } = params;
  const form = null;
  if (!form) {
    notFound();
  }
  return (
    <main className="container mx-auto max-w-2xl pt-16 px-6 flex-grow">OK</main>
  );
}
