import { Theme, ColorState } from "@theme";

export const _theme: Theme = "light";

export const _colors: Record<Theme, Record<ColorState, string>> = {
    light: {
        "text": "rgb(15, 23, 42)",
        "text-secondary": "rgb(100, 116, 139)",

        "bg": "rgb(220, 220, 255)",
        "bg-secondary": "rgb(255, 255, 255)",

        "border": "rgb(226, 232, 240)",

        "primary": "rgb(59, 130, 246)",
        "error": "rgb(239, 68, 68)",
        "warning": "rgb(245, 158, 11)",
        "info": "rgb(14, 165, 233)",
        "success": "rgb(34, 197, 94)",
    },

    dark: {
        "text": "rgb(241, 245, 249)",
        "text-secondary": "rgb(148, 163, 184)",

        "bg": "rgb(15, 23, 42)",
        "bg-secondary": "rgb(30, 41, 59)",

        "border": "rgb(51, 65, 85)",

        "primary": "rgb(96, 165, 250)",
        "error": "rgb(248, 113, 113)",
        "warning": "rgb(251, 191, 36)",
        "info": "rgb(56, 189, 248)",
        "success": "rgb(74, 222, 128)",
    },
};
