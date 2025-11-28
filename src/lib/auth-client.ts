export const ADMIN_EMAIL = (process.env.ADMIN_EMAIL ?? process.env.NEXT_PUBLIC_ADMIN_EMAIL)?.toLowerCase();

export const isAdminEmail = (email?: string | null) => {
    if (!email || !ADMIN_EMAIL) {
        return false;
    }
    return email.toLowerCase() === ADMIN_EMAIL;
};
