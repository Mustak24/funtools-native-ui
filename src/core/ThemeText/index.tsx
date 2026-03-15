import { Animated, TextProps } from "react-native";
import { type ColorStates, useThemeStore } from "@theme";
import { AnimatedInterpolValue } from "@shared/types/native.types";


export type ThemeTextProps = TextProps & {
    color?: ColorStates,
    textColor?: string | AnimatedInterpolValue
}

export function ThemeText({style, color: _color = 'text', textColor, ...props}: ThemeTextProps): React.JSX.Element {

    const color = useThemeStore(states => textColor ?? states.colors[_color]);

    return (
        <Animated.Text {...props} 
            style={[style, {color}]}
        />
    )
}