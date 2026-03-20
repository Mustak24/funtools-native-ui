import { Color, ColorState, useThemeStore } from "@theme";
import { ButtonVariant } from "./types";
import { toRgba } from "@shared/utils/theme.utils";



export function getButtonStyle(color: ColorState, variant: ButtonVariant, {text, bg}: {text?: Color, bg?: Color} = {}) {
    const theme = useThemeStore(({colors}) => {
        if (["text", "bg"].includes(color ?? "")) {
            return {
                bgColor: colors[color],
                textColor: colors[color === "text" ? "bg" : "text"],
            };
        }

        return {
            bgColor: colors[color],
            textColor: "255, 255, 255" as Color,
        };
        
    });

    text ??= theme.textColor;
    bg ??= theme.bgColor;


    if(variant === 'solid') return {text: toRgba(text), bg: toRgba(bg), border: toRgba(bg)};

    if(variant === 'outlined') return {text: toRgba(bg), bg: 'transparent', border: toRgba(bg)};

    if(variant === 'soft') return {text: toRgba(bg), bg: toRgba(bg, 20), border: toRgba(bg, 20)};

    if(variant === 'soft-outlined') return {text: toRgba(bg), bg: toRgba(bg, 20), border: toRgba(bg)};

    if(variant === 'text') return {text: toRgba(bg), bg: 'transparent', border: 'transparent'};

    return {text: toRgba(text), bg: toRgba(bg), border: toRgba(bg)};
}
