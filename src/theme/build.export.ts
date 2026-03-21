import { useThemeHandlers } from "./store";

const {
    toggleTheme,
    colors: { updateMany: updateColors },
    theme: { set: updateTheme },
} = useThemeHandlers();

export * from "@shared/utils/theme.utils";

export { useThemeStore } from "./store";

export { toggleTheme, updateColors, updateTheme };
