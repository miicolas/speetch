export interface Session {
    session: {
        id: string;
        expiresAt: Date;
        token: string;
        createdAt: Date;
        updatedAt: Date;
        ipAddress: string;
        userAgent: string;
        userId: string;
        impersonatedBy: string | null;
        stripeCustomerId: string | null;
    };
    user: {
        id: string;
        name: string;
        email: string;
        emailVerified: boolean;
        image: string;
        createdAt: Date;
        updatedAt: Date;
        role: string;
        banned: string | null;
        banReason: string | null;
        banExpires: string | null;
    };
}