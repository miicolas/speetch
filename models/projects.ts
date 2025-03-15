import db from "@/db";
import { projects, steps_project } from "@/db/project-schema";
import { Step } from "@/lib/types/project-type";
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

    static async getSteps(projectId: string) {
        return await db
            .select()
            .from(steps_project)
            .where(eq(steps_project.projectId, projectId))
            .execute();
    }

    static async addStep(projectId: string, step: Step) {
        return await db
            .insert(steps_project)
            .values({
                id: uuidv4(),
                name: step.name,
                description: step.description,
                status: step.status,
                projectId: projectId,
            })
            .execute();
    }
}
