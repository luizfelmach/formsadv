"use client";

export default function Page() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="border h-12 flex items-center bg-background text-foreground font-extrabold">
        Olá mundo
      </h1>
      <h1 className="h-12 flex items-center bg-primary text-primary-foreground font-extrabold">
        Olá mundo
      </h1>
      <h1 className="h-12 flex items-center bg-secondary text-secondary-foreground font-extrabold">
        Olá mundo
      </h1>
      <h1 className="h-12 flex items-center bg-accent text-accent-foreground font-extrabold">
        Olá mundo
      </h1>
      <h1 className="h-12 flex items-center bg-destructive text-destructive-foreground font-extrabold">
        Olá mundo
      </h1>
      <h1 className="h-12 flex items-center bg-success text-success-foreground font-extrabold">
        Olá mundo
      </h1>
    </div>
  );
}
