"use client";
import { Logout } from "@/actions";
import { Button } from "../ui/button";

export async function Dashboard() {
  return (
    <div>
      <Button
        onClick={() => {
          Logout();
        }}
      >
        Sair
      </Button>
    </div>
  );
}
