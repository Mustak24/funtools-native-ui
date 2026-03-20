import { useThemeHandlers } from "./store";
import { Color, ColorState } from "./types";

const { toggleTheme, updateTheme, updateThemeColor } = useThemeHandlers()

export { useThemeStore } from './store';

export { toggleTheme, updateTheme, updateThemeColor }

