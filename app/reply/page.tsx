import { ReplyForm } from "@/components/reply-form";

export default function Reply() {
  return (
    <div>
      <ReplyForm
        form={{
          screens: [
            {
              screenKey: "1123123",
              type: "statement",
              title: "Prezados clientes, criamos esse formulário para você!",
              options: [],
              description: "Dedique seu tempo aqui!",
            },
            {
              screenKey: "1",
              type: "text",
              title: "Seu nome",
              options: [],
              description: "Informe seu nome completo!",
              required: true,
            },
            {
              screenKey: "2",
              type: "text",
              title: "Seu número de telefone",
              options: [],
              description: "Informe seu número abaixo!",
              visible: [
                {
                  screenKey: "1",
                  screenType: "text",
                  query: "endsWith",
                  value: "gmail.com",
                },
              ],
            },
            {
              screenKey: "123123131212",
              type: "statement",
              title: "Prezados clientes, criamos esse formulário para você!",
              options: [],
              description: "Dedique seu tempo aqui!",
            },
            {
              screenKey: "2123",
              type: "date",
              title: "Sua data de nascimento",
              options: [],
              description: "Informe seu número abaixo!",
              visible: [
                {
                  screenKey: "1",
                  screenType: "text",
                  query: "equals",
                  value: "Pedro",
                },
              ],
            },
            {
              screenKey: "3",
              type: "number",
              title: "Sua idade!",
              options: [],
              description: "Informe sua idade!",
              visible: [
                {
                  screenKey: "1",
                  screenType: "text",
                  query: "equals",
                  value: "Luiz",
                },
              ],
            },
            {
              screenKey: "4",
              type: "radio",
              title: "Você gosta de comer macarrão?",
              options: ["Sim", "Não"],
              description: "",
              visible: [
                {
                  screenKey: "1",
                  screenType: "text",
                  query: "equals",
                  value: "Luiz",
                },
                {
                  screenKey: "3",
                  screenType: "number",
                  query: "gte",
                  value: 18,
                },
                {
                  screenKey: "3",
                  screenType: "number",
                  query: "lte",
                  value: 40,
                },
                {
                  screenKey: "3",
                  screenType: "number",
                  query: "notEquals",
                  value: 24,
                },
              ],
            },

            {
              screenKey: "5",
              type: "checkbox",
              title: "Quais frutas voce gosta?",
              options: ["Uva", "Morango"],
              description: "Digite aqui",
              visible: [
                {
                  screenKey: "4",
                  screenType: "radio",
                  query: "equals",
                  value: "Sim",
                },
                {
                  screenKey: "4",
                  screenType: "radio",
                  query: "startsWith",
                  value: "W",
                },
              ],
              required: true,
            },
            {
              screenKey: "10",
              type: "end",
              title: "Obrigado por responder esse formulário.",
              options: [],
              description:
                "Entraremos em contato com você em breve para esclarecer eventuais dúvidas.",
            },
          ],
        }}
      />
    </div>
  );
}
