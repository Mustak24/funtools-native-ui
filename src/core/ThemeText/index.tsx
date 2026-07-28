import { Animated, Text, TextProps } from "react-native";
import { type ColorState, useThemeStore } from "@theme";
import { AnimatedInterpolValue } from "@shared/types/native";
import { toRgba } from "@shared/utils/theme";
import { forwardRef } from "react";

export type ThemeTextProps = TextProps & {
    color?: ColorState;
    alpha?: number;
    textColor?: string | AnimatedInterpolValue;
};

export const ThemeText = forwardRef<Text, ThemeTextProps>((props, ref) => {
    const {
        style,
        color: _color = "text",
        alpha = 100,
        textColor
    } = props;

    const themeColor = useThemeStore((states) => states.colors[_color]);

    const color = textColor ?? toRgba(themeColor, alpha);

    return (
        <Animated.Text
            {...props}
            ref={ref}
            style={[{ color }, style]}
        />
    )
})