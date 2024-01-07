import { FormPageType } from "@/types";

interface FormPageProps {
  title: string;
  subtitle: string;
}

export class FormPage {
  public title: string;
  public subtitle: string;

  constructor({ title, subtitle }: FormPageProps) {
    this.title = title;
    this.subtitle = subtitle;
  }
}
