import { useThemeHandlers } from "./store";
import { Color, ColorState } from "./types";


export { useThemeStore } from './store';

export function  updateThemeColor(color: ColorState, val: [r: number, g: number, b: number]) {
    useThemeHandlers().colors.update(color, val.join(', ') as Color);
}
