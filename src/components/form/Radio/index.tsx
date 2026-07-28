import { ThemeView, ThemeViewProps } from "@core";
import { useAnimatedValue } from "@hooks";
import { useThemeStore } from "@theme";
import { useEffect } from "react";

export type RadioProps = {
    size?: number;
    isOn?: boolean;
    borderWidth?: number;
} & ThemeViewProps;

export function Radio(props: RadioProps) {

    const {
        size = 22, 
        color = 'primary', 
        isOn = false, 
        borderWidth = 2,
        ...containerProps
    } = props;

    const colors = useThemeStore(store => store.colors);
    const animatedValue = useAnimatedValue(0);

    useEffect(() => {
        const animation = animatedValue.springAnimation({
            toValue: isOn ? 1 : 0,
            useNativeDriver: false,
            bounciness: 12,
            speed: 6
        });

        animation.start();
        return () => animation.stop();
    }, [isOn])

    return (
        <ThemeView
            {...containerProps}
            alpha={0}
            style={{
                position: 'relative',
                width: size, height: size, borderRadius: size,
                borderWidth, borderColor: colors[color ?? 'primary'],
                justifyContent: 'center', alignItems: 'center',
                padding: borderWidth
            }}
        >
            <ThemeView
                color={color}
                style={{
                    width: '100%', height: '100%', borderRadius: size,
                    opacity: animatedValue,
                    transform: [
                        {
                            scale: animatedValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.5, 1]
                            })
                        }
                    ]
                }}
            />
        </ThemeView>
    )
}