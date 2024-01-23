import { ReplyForm } from "@/components/reply-form";

export default function Reply() {
  return (
    <div>
      <ReplyForm
        form={{
          screens: [
            {
              screenKey: "1",
              type: "text",
              title: "Seu nome",
              options: [],
              description: "Informe seu nome completo!",
            },
            {
              screenKey: "2",
              type: "textarea",
              title: "Seu número de telefone",
              options: [],
              description: "Informe seu número abaixo!",
            },
            {
              screenKey: "3",
              type: "number",
              title: "Sua idade",
              options: [],
              description: "Informe seu número abaixo!",
            },
            {
              screenKey: "4",
              type: "radio",
              title: "Você gosta de comer macarrão?",
              options: ["Sim", "Não"],
              description: "Informe seu número abaixo!",
            },

            {
              screenKey: "5",
              type: "checkbox",
              title: "Quais frutas voce gosta?",
              options: ["Uva", "Morango"],
              description: "Informe seu número abaixo!",
            },
          ],
        }}
      />
    </div>
  );
}