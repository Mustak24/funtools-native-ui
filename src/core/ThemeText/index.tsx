import { Animated, TextProps } from "react-native";
import { type ColorState, useThemeStore } from "@theme";
import { AnimatedInterpolValue } from "@shared/types/native.types";
import { toRgba } from "@shared/utils/theme.utils";

export type ThemeTextProps = TextProps & {
    color?: ColorState;
    alpha?: number;
    textColor?: string | AnimatedInterpolValue;
};

export function ThemeText({
    style,
    color: _color = "text",
    alpha = 100,
    textColor,
    ...props
}: ThemeTextProps): React.JSX.Element {
    const themeColor = useThemeStore((states) => states.colors[_color]);

    const color = textColor ?? toRgba(themeColor, alpha);

    return <Animated.Text {...props} style={[style, { color }]} />;
}
