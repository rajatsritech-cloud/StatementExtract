import { createClerkClient, verifyToken } from "@clerk/backend";

const ADMIN_EMAIL = (process.env.ADMIN_EMAIL ?? process.env.NEXT_PUBLIC_ADMIN_EMAIL)?.toLowerCase();

export const isAdminEmail = (email?: string | null) => {
  if (!email || !ADMIN_EMAIL) {
    return false;
  }
  return email.toLowerCase() === ADMIN_EMAIL;
};

export interface AdminUser {
  id: string;
  email: string;
  isAdmin: boolean;
}

let clerkClient: ReturnType<typeof createClerkClient> | null = null;

const getClerkClient = () => {
  if (!clerkClient) {
    const secretKey = process.env.CLERK_SECRET_KEY;
    if (!secretKey) {
      throw new Error("CLERK_SECRET_KEY is not configured");
    }

    clerkClient = createClerkClient({
      secretKey,
      publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    });
  }

  return clerkClient;
};

export async function verifyAdminFromToken(token?: string | null): Promise<AdminUser | null> {
  if (!token) {
    return null;
  }

  try {
    const secretKey = process.env.CLERK_SECRET_KEY;
    if (!secretKey) {
      throw new Error("CLERK_SECRET_KEY is not configured");
    }

    const payload = await verifyToken(token, {
      secretKey,
    });

    const userId = (payload.sub as string | undefined) ?? undefined;
    if (!userId) return null;

    let email = (payload.email as string | undefined) ?? undefined;

    if (!email) {
      const user = await getClerkClient().users.getUser(userId);
      email = user?.primaryEmailAddress?.emailAddress ?? undefined;
    }

    if (!email) return null;

    const isAdmin = isAdminEmail(email);

    return {
      id: userId,
      email,
      isAdmin,
    };
  } catch (error) {
    console.error("Failed to verify Clerk token", error);
    return null;
  }
}
