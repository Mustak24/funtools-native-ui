import { useThemeHandlers } from "./store";
import { Theme } from "./types";

const {
    toggleTheme,
    updateTheme,
    colors,
    palettes,
} = useThemeHandlers();

export * from "@shared/utils/theme.utils";
export * from "./types";

export { useThemeStore } from "./store";

export { toggleTheme, updateTheme };

export function updateColors(theme: Theme, _colors: Parameters<typeof colors['updateMany']>[0]) {
    colors.updateMany(_colors);
    palettes.updateMany({
        [theme]: _colors
    });
}