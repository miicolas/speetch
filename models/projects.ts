import db from "@/db";
import { user } from "@/db/auth-schema";
import { projects, steps_project } from "@/db/project-schema";
import { Step, Project } from "@/lib/types/project-type";
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
        public clientId: string | null,
        public endDate: Date,
        public userId: string | null
    ) {}

    static async getProjects(userId: string): Promise<Project[]> {
        const result = await db
            .select()
            .from(projects)
            .where(eq(projects.userId, userId))
            .execute();

        return result.map((project) => ({
            ...project,
            clientId: project.clientId || null,
            userId: project.userId || null,
            createdAt: project.createdAt || null,
            updatedAt: project.updatedAt || null,
            client: null,
        })) as Project[];
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
                endDate: end_date,
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

    static async getProjectContact(projectId: string) {
        const project = await db
            .select()
            .from(projects)
            .where(eq(projects.id, projectId))
            .execute();

        if (!project[0].userId) {
            return null;
        }

        const contact = await db
            .select({
                name: user.name,
                email: user.email,
            })
            .from(user)
            .where(eq(user.id, project[0].userId))
            .execute();

        return contact[0];
    }
}
