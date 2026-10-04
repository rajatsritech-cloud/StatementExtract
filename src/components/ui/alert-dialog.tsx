"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

interface AlertDialogContextType {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AlertDialogContext = React.createContext<AlertDialogContextType | undefined>(undefined)

const AlertDialog = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = React.useState(false)
    return (
        <AlertDialogContext.Provider value={{ open, setOpen }}>
            {children}
        </AlertDialogContext.Provider>
    )
}

const AlertDialogTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ children, asChild, onClick, ...props }, ref) => {
    const context = React.useContext(AlertDialogContext)
    if (!context) throw new Error("AlertDialogTrigger must be used within AlertDialog")

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        context.setOpen(true)
        onClick?.(e)
    }

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children as React.ReactElement<any>, {
            onClick: handleClick,
        })
    }

    return (
        <button ref={ref} onClick={handleClick} {...props}>
            {children}
        </button>
    )
})
AlertDialogTrigger.displayName = "AlertDialogTrigger"

const AlertDialogContent = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const context = React.useContext(AlertDialogContext)
    if (!context) throw new Error("AlertDialogContent must be used within AlertDialog")

    if (!context.open) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => context.setOpen(false)}>
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
            <div
                className={cn(
                    "relative z-50 w-full max-w-md rounded-lg border bg-[hsl(var(--background))] p-6 shadow-lg",
                    className
                )}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
}

const AlertDialogHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)}>
        {children}
    </div>
)

const AlertDialogFooter = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4", className)}>
        {children}
    </div>
)

const AlertDialogTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <h2 className={cn("text-lg font-semibold text-[hsl(var(--foreground))]", className)}>
        {children}
    </h2>
)

const AlertDialogDescription = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <p className={cn("text-sm text-[hsl(var(--muted-foreground))]", className)}>
        {children}
    </p>
)

const AlertDialogAction = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, className, onClick, ...props }, ref) => {
    const context = React.useContext(AlertDialogContext)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e)
        context?.setOpen(false)
    }

    return (
        <button
            ref={ref}
            className={cn(
                "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
                className
            )}
            onClick={handleClick}
            {...props}
        >
            {children}
        </button>
    )
})
AlertDialogAction.displayName = "AlertDialogAction"

const AlertDialogCancel = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, className, ...props }, ref) => {
    const context = React.useContext(AlertDialogContext)
    if (!context) throw new Error("AlertDialogCancel must be used within AlertDialog")

    return (
        <button
            ref={ref}
            className={cn(
                "inline-flex items-center justify-center rounded-md border border-[hsl(var(--border))] bg-transparent px-4 py-2 text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-colors mt-2 sm:mt-0",
                className
            )}
            onClick={() => context.setOpen(false)}
            {...props}
        >
            {children}
        </button>
    )
})
AlertDialogCancel.displayName = "AlertDialogCancel"

export {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel,
}
