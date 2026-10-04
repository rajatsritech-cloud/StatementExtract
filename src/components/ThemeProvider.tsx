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
    const [theme, setTheme] = React.useState<Theme>(defaultTheme);
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        try {
            const storedTheme = localStorage.getItem(storageKey) as Theme;
            if (storedTheme && ["green", "blue", "violet", "orange"].includes(storedTheme)) {
                setTheme(storedTheme);
            }
        } catch {
            // ignore localStorage errors
        }
        setMounted(true);
    }, [storageKey]);

    React.useEffect(() => {
        try {
            localStorage.removeItem("statement-extract-mode");
            localStorage.removeItem("vite-ui-mode");
        } catch {
            // ignore
        }
        if (mounted) {
            const root = window.document.documentElement;
            root.setAttribute("data-theme", theme);
            root.classList.add("dark");
            root.classList.remove("light");
        }
    }, [theme, mounted]);

    const value = {
        theme,
        setTheme: (newTheme: Theme) => {
            try {
                localStorage.setItem(storageKey, newTheme);
            } catch {
                // ignore
            }
            setTheme(newTheme);
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
