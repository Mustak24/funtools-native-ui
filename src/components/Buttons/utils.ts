import { ButtonVariant } from "./types";
import { toRgba } from "@shared/utils/theme.utils";



export function getButtonStyle({text, bg, variant}: {text: string, bg: string, variant: ButtonVariant}) {
    if(variant === 'solid') return {text: toRgba(text), bg: toRgba(bg), border: toRgba(bg)};

    if(variant === 'outlined') return {text: toRgba(bg), bg: 'transparent', border: toRgba(bg)};

    if(variant === 'soft') return {text: toRgba(bg), bg: toRgba(bg, 20), border: toRgba(bg, 20)};

    if(variant === 'soft-outlined') return {text: toRgba(bg), bg: toRgba(bg, 20), border: toRgba(bg)};

    if(variant === 'text') return {text: toRgba(bg), bg: 'transparent', border: 'transparent'};

    return {text: toRgba(text), bg: toRgba(bg), border: toRgba(bg)};
}
