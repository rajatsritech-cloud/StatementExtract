"use client";

import * as React from "react";

export type Theme = "green" | "blue" | "violet" | "orange";

type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
};

type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
    theme: "orange",
    setTheme: () => null,
};

const ThemeProviderContext = React.createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
    children,
    defaultTheme = "orange",
    storageKey = "vite-ui-theme",
    ...props
}: ThemeProviderProps) {
    // Start with default theme to avoid hydration mismatch
    const [theme, setTheme] = React.useState<Theme>(defaultTheme);
    const [mounted, setMounted] = React.useState(false);

    // Read from localStorage only after mount (client-side)
    React.useEffect(() => {
        const stored = localStorage.getItem(storageKey) as Theme;
        if (stored && ["green", "blue", "violet", "orange"].includes(stored)) {
            setTheme(stored);
        }
        setMounted(true);
    }, [storageKey]);

    React.useEffect(() => {
        if (mounted) {
            const root = window.document.documentElement;
            root.setAttribute("data-theme", theme);
        }
    }, [theme, mounted]);

    const value = {
        theme,
        setTheme: (theme: Theme) => {
            localStorage.setItem(storageKey, theme);
            setTheme(theme);
        },
    };

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export const useTheme = () => {
    const context = React.useContext(ThemeProviderContext);

    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider");

    return context;
};
