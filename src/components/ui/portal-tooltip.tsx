"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface PortalTooltipProps {
    content: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}

export const PortalTooltip = ({ content, children, className = "" }: PortalTooltipProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isVisible && triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            // Position above the element, centered horizontally
            setPosition({
                top: rect.top + window.scrollY - 10, // 10px spacing
                left: rect.left + window.scrollX + (rect.width / 2)
            });
        }
    }, [isVisible]);

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    return (
        <>
            <div
                ref={triggerRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`inline-block ${className}`}
            >
                {children}
            </div>
            {isVisible && typeof document !== "undefined" && createPortal(
                <div
                    className="fixed z-[9999] pointer-events-none transform -translate-x-1/2 -translate-y-full"
                    style={{ top: position.top, left: position.left }}
                >
                    <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 shadow-xl max-w-xs whitespace-normal break-words relative mb-2">
                        {content}
                        {/* Arrow */}
                        <div className="absolute top-full left-1/2 -ml-1 -mt-1 w-2 h-2 bg-gray-900 rotate-45 transform"></div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};
