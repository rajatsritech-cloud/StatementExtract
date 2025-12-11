import { ShieldCheck } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const PrivacyNotice = ({ className, size = 'default' }: { className?: string; size?: 'default' | 'large' }) => {
    const isLarge = size === 'large';

    return (
        <Alert className={`bg-[hsl(var(--primary))]/5 border-[hsl(var(--primary))]/20 ${isLarge ? 'p-6' : 'px-4 py-3'} ${className}`}>
            <ShieldCheck className={`${isLarge ? 'h-6 w-6 top-6' : 'h-4 w-4 top-4'} text-[hsl(var(--primary))]`} />
            <AlertTitle className={`text-[hsl(var(--foreground))] ${isLarge ? 'text-lg mb-2' : ''}`}>Your Data is Private & Secure</AlertTitle>
            <AlertDescription className={`text-[hsl(var(--muted-foreground))] ${isLarge ? 'text-base' : 'text-xs'}`}>
                We store your last 100 transactions locally in your browser (IndexedDB). Your financial data is <strong>never</strong> stored on our servers.
            </AlertDescription>
        </Alert>
    );
};
