"use server";

import { FormResponse } from "@/lib/types/form-type";
import { Newsletter } from "@/models/newsletter";
import { z } from "zod";

const bodySchema = z.object({
  email: z.string().email(),
});

export async function addMail(
  body: z.infer<typeof bodySchema>
): Promise<FormResponse> {
  try {
    const validatedEmail = bodySchema.safeParse(body);
    if (!validatedEmail.success) {
      return {
        status: "error",
        errors: validatedEmail.error.issues,
      };
    }

    const addMail = await Newsletter.addMail(validatedEmail.data.email);

    if (!addMail) {
      return {
        status: "error",
        message: "Email already exists",
      };
    }

    return {
      status: "success",
      message: "Email added to newsletter",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        status: "error",
        message: "Invalid data format",
        errors: error.issues,
      };
    }
    console.error("Database error:", error);
    return { status: "error", message: "Failed to add email to newsletter" };
  }
}
