import { forwardRef } from "react";
import { Animated, View, ViewProps } from "react-native";
import { useThemeStore, type ColorState } from "@theme";
import { AnimatedInterpolValue } from "@shared/types/native";
import { toRgba } from "@shared/utils/theme";


export type ThemeViewProps = Omit<ViewProps, 'style'> & {
    alpha?: number;
    color?: ColorState;
    backgroundColor?: string | AnimatedInterpolValue;
    style?: Animated.AnimatedProps<ViewProps>['style'];
}


export const ThemeView = forwardRef<View, ThemeViewProps>((props, ref) => {
    let {
        style, 
        backgroundColor, 
        color = 'bg', 
        alpha = 100,
    } = props;

    const { _backgroundColor } = useThemeStore((states) => ({
        _backgroundColor: states.colors[color],
    }));

    if (!backgroundColor) backgroundColor = toRgba(_backgroundColor, alpha);

    return (
        <Animated.View
            {...props}
            ref={ref}
            style={[{backgroundColor}, style]}
        />
    )
})