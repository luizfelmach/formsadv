"use client";
import { NotFoundSvg } from "@/components/svg/not-found";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="bg-background justify-center items-center h-screen mx-8 flex flex-col-reverse lg:flex-row">
      <div>
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Não foi possível encontrar essa página.
        </h2>
        <Button
          type="button"
          className="mt-4"
          onClick={() => {
            router.back();
          }}
        >
          Voltar
        </Button>
      </div>
      <NotFoundSvg />
    </div>
  );
}
