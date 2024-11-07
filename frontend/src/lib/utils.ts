import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toastDateFormat(date: Date) {
    return `${new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "2-digit"
    }).format(date)} at ${new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    }).format(date)}`;
}

export function abbreviateNumber(num: number) {
    const format = (num: number, suffix: string) => (num % 1 === 0 ? num + suffix : num.toFixed(1) + suffix);

    if (num >= 1e9) return format(num / 1e9, "B");
    if (num >= 1e6) return format(num / 1e6, "M");
    if (num >= 1e3) return format(num / 1e3, "k");
    return num.toString();
}

export function formatText(str: string): string {
    return str.split("_").map(word => word[0] + word.slice(1).toLowerCase()).join(" ");
}