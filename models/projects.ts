import db from "@/db";
import { projects } from "@/db/project-schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
export class Projects {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public amount: number,
        public status: string,
        public paymentDate: Date,
        public paymentStatus: string,
        public paymentMethod: string,
        public clientId: string,
        public endDate: Date,
        public userId: string
    ) {}

    static async getProjects(userId: string) {
        return await db
            .select()
            .from(projects)
            .where(eq(projects.userId, userId))
            .execute();
    }

    static async getProject(projectId: string) {
        console.log(projectId, 'projectId');
        return await db
            .select()
            .from(projects)
            .where(eq(projects.id, projectId))
            .execute();
    }

    static async addProject(
        name: string,
        description: string,
        amount: number,
        status: string,
        payment_date: Date,
        payment_status: string,
        payment_method: string,
        client_id: string,
        end_date: Date,
        userId: string
    ) {
        return await db
            .insert(projects)
            .values({
                id: uuidv4(),
                name,
                description,
                amount,
                status,
                paymentDate: payment_date,
                paymentStatus: payment_status,
                paymentMethod: payment_method,
                clientId: client_id,
                endDate: end_date.toISOString(),
                userId: userId,
            })
            .execute();
    }

    static async updateProject(projectId: string, updateData: any) {
        return await db
            .update(projects)
            .set(updateData)
            .where(eq(projects.id, projectId))
            .execute();
    }
}
