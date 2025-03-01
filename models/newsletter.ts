import db from "@/db";
import { newsletterTable } from "@/db/newsletter-schema";


export class Newsletter {
  constructor(
    public email: string,

  ) { }

  static async addMail(email: string) {
    return await db.insert(newsletterTable).values({ email }).$returningId().execute();
  }

}
