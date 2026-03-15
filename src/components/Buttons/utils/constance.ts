import { ButtonLayout, ButtonSize } from "./types";

export const BUTTON_LAYOUT: Record<ButtonSize, ButtonLayout> = {
    'xs': {
        height: 24,
        borderRadius: 8,
        paddingInline: 8,
        fontSize: 10,
        borderWidth: 1
    },
    'sm': {
        height: 32,
        borderRadius: 12,
        paddingInline: 12,
        fontSize: 14,
        borderWidth: 1
    },
    'md': {
        height: 40,
        borderRadius: 14,
        paddingInline: 14,
        fontSize: 16,
        borderWidth: 1
    },
    'lg': {
        height: 48,
        borderRadius: 16,
        paddingInline: 16,
        fontSize: 20,
        borderWidth: 2
    },
    'xl': {
        height: 56,
        borderRadius: 18,
        paddingInline: 18,
        fontSize: 24,
        borderWidth: 2
    }
}