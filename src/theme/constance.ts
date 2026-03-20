import { Theme, ColorState, Color } from "./types";

export const _theme: Theme = "light";

export const _colors: Record<Theme, Record<ColorState, Color>> = {
    light: {
        text: "15, 23, 42",
        "text-secondary": "100, 116, 139",

        bg: "220, 220, 255",
        "bg-secondary": "255, 255, 255",

        border: "226, 232, 240",

        primary: "59, 130, 246",
        error: "239, 68, 68",
        warning: "245, 158, 11",
        info: "14, 165, 233",
        success: "34, 197, 94",
    },

    dark: {
        text: "241, 245, 249",
        "text-secondary": "148, 163, 184",

        bg: "15, 23, 42",
        "bg-secondary": "30, 41, 59",

        border: "51, 65, 85",

        primary: "96, 165, 250",
        error: "248, 113, 113",
        warning: "251, 191, 36",
        info: "56, 189, 248",
        success: "74, 222, 128",
    },
};
