import { Animated, ViewProps } from "react-native";
import { useThemeStore, type ColorState } from "@theme";
import { AnimatedInterpolValue } from "@shared/types/native.types";
import { toRgba } from "@shared/utils/theme.utils";

export type ThemeViewProps = ViewProps & {
    color?: ColorState;
    alpha?: number;
    backgroundColor?: string | AnimatedInterpolValue;
    useWindBackground?: boolean;
};

export function ThemeView({
    style,
    color = "bg",
    alpha = 100,
    backgroundColor,
    useWindBackground = false,
    ...props
}: ThemeViewProps): React.JSX.Element {
    const { _backgroundColor } = useThemeStore((states) => ({
        _backgroundColor: states.colors[color],
    }));

    if (!backgroundColor) backgroundColor = toRgba(_backgroundColor, alpha);

    return (
        <Animated.View
            {...props}
            style={[
                style,
                useWindBackground === false ? { backgroundColor } : null,
            ]}
        />
    );
}
