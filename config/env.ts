import * as yup from "yup";

const envSchema = yup.object({
  API_URL: yup.string().required(),
});

export const env = envSchema.validateSync(process.env);
