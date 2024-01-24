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
              type: "text",
              title: "Seu número de telefone",
              options: [],
              description: "Informe seu número abaixo!",
            },
            {
              screenKey: "2123",
              type: "date",
              title: "Sua data de nascimento",
              options: [],
              description: "Informe seu número abaixo!",
            },
            {
              screenKey: "3",
              type: "number",
              title: "Sua idade!",
              options: [],
              description: "Informe sua idade!",
            },
            {
              screenKey: "4",
              type: "radio",
              title: "Você gosta de comer macarrão?",
              options: ["Sim", "Não"],
              description: "",
            },

            {
              screenKey: "5",
              type: "checkbox",
              title: "Quais frutas voce gosta?",
              options: ["Uva", "Morango"],
              description: "Digite aqui",
            },
          ],
        }}
      />
    </div>
  );
}
