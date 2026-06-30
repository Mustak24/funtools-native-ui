import { ReactNode, useRef, useState } from "react";
import { type ColorState, useThemeStore } from "@theme";
import {
    Animated,
    GestureResponderEvent,
    Pressable as NativePressable,
    PressableProps,
    StyleSheet,
    useAnimatedValue,
    View,
    ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { toRgba } from "@shared/utils/theme";

const Pressable = Animated.createAnimatedComponent(NativePressable);

export type RippleContainerProps = Omit<
    PressableProps,
    "style" | "children"
> & {
    children?: ReactNode;
    color?: ColorState;
    style?: ViewStyle;
    rippleOpacity?: number;
    rippleColor?: string;
    rippleScale?: number;
    rippleCount?: number;
    duration?: number;
};

export function RippleContainer({
    children,
    style,
    onPress,
    color = "text",
    rippleColor,
    rippleOpacity = 0.4,
    rippleScale = 1,
    duration = 300,
    rippleCount = 3,
    disabled = false,
    ...props
}: RippleContainerProps) {
    disabled = disabled === undefined || disabled;

    const { top, left } = useSafeAreaInsets();

    const _rippleColor = useThemeStore((s) => s.colors[color]);
    rippleColor ??= toRgba(_rippleColor);

    const [position, setPosition] = useState<{ top: number; left: number }>({
        top: 0,
        left: 0,
    });

    const animatedValue = useAnimatedValue(0);
    const scaleAnimation = useAnimatedValue(1);

    const button = useRef<View>(null);

    function handleOnPress(event: GestureResponderEvent) {
        if(disabled) return;

        const { pageX, pageY } = event.nativeEvent;
        button.current?.measureInWindow((x, y, w) => {
            x += left;
            y += top;

            setPosition({ top: pageY - y - w / 2, left: pageX - x - w / 2 });
        });

        startAnimation();

        onPress?.(event);
    }

    function handleOnPressIn(event: GestureResponderEvent) {
        if(disabled) return;
        props.onPressIn?.(event);
        Animated.spring(scaleAnimation, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
        
    }

    function handleOnPressOut(event: GestureResponderEvent) {
        if(disabled) return;
        props.onPressOut?.(event);
        Animated.spring(scaleAnimation, {
            toValue: 1,
            useNativeDriver: true,
            bounciness: 5,
            speed: 10
        }).start();
    }

    function startAnimation() {
        if(disabled) return;
        Animated.timing(animatedValue, {
            toValue: 1,
            duration,
            useNativeDriver: true,
        }).start(() => {
            animatedValue.setValue(0);
        });
    }

    return (
        <Pressable
            ref={button}
            {...props}
            disabled={disabled}
            onPress={handleOnPress}
            onPressIn={handleOnPressIn}
            onPressOut={handleOnPressOut}
            style={[style, styles.container, { transform: [{scale: scaleAnimation}] }]}
        >
            <View style={[styles.rippleContainer, { ...position }]}>
                {[...new Array(Math.min(rippleCount, 5))].map((_, index) => (
                    <Animated.View
                        key={index}
                        style={[
                            styles.ripple,
                            {
                                backgroundColor: rippleColor,

                                opacity: animatedValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [
                                        rippleOpacity *
                                            ((rippleCount - index) /
                                                rippleCount),
                                        0,
                                    ],
                                }),

                                transform: [
                                    {
                                        scale: animatedValue.interpolate({
                                            inputRange: [0, 0.1, 1],
                                            outputRange: [
                                                0,
                                                rippleScale * 0.1,
                                                rippleScale + index * 0.1,
                                            ],
                                        }),
                                    },
                                ],
                            },
                        ]}
                    />
                ))}
            </View>

            {children}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        overflow: "hidden",
        position: "relative",
    },
    rippleContainer: {
        position: "absolute",
        aspectRatio: 1,
        width: "100%",
    },
    ripple: {
        position: "absolute",
        width: "100%",
        borderRadius: 1000000,
        aspectRatio: 1,
    },
});
