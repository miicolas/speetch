import { ZodIssue } from "zod";

export type FormResponse<T = unknown> = {
    status: "success" | "error";
    errors?: ZodIssue[];
    message?: string;
    content?: T;
};