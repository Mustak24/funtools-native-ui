import { useMemo } from "react";
import { useThemeStore, type ColorStates } from "@theme";
import { ButtonVariants } from "./types";

export function getButtonStyle(variant: ButtonVariants, color: ColorStates) {
    const {textColor, bgColor} = useThemeStore((states) => {
        if(['text', 'bg'].includes(color ?? '')) {
            return {
                bgColor: states.colors[color],
                textColor: states.colors[color === 'text' ? 'bg' : 'text']
            }
        }

        return {
            bgColor: states.colors[color],
            textColor: 'rgb(255,255,255)'
        }
    })


    const style = useMemo(() => ({
        'solid': {
            color: textColor,
            backgroundColor: bgColor,
            borderColor: bgColor,
        },

        'outlined': {
            color: bgColor,
            backgroundColor: 'transparent',
            borderColor: bgColor,
        },

        'soft': {
            color: bgColor,
            backgroundColor: bgColor.replace(')', ', 0.2)'),
            borderColor: bgColor.replace(')', ', 0.2)'),
        },

        'soft-outlined': {
            color: bgColor,
            backgroundColor: bgColor.replace(')', ', 0.2)'),
            borderColor: bgColor
        },

        'text': {
            color: bgColor,
            backgroundColor: 'transparent',
            borderColor: 'transparent',
        }
    }[variant]), [bgColor, textColor]);

    return style;
}