import { z } from "zod";

export const ContactUsCredentialsValidator = z.object({
  email: z.string().email(),
});

export type TContactUsCredentialsValidator = z.infer<
  typeof ContactUsCredentialsValidator
>;
