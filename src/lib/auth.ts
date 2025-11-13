import { auth, currentUser } from "@clerk/nextjs/server";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL?.toLowerCase();

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

export async function getUserFromRequest(): Promise<AdminUser | null> {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }

  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress;

  if (!email) {
    return null;
  }

  const isAdmin = isAdminEmail(email);

  return {
    id: userId,
    email,
    isAdmin,
  };
}
