import { ThemeView, ThemeViewProps } from "@core";
import { useEffect } from "react";
import { Animated, useAnimatedValue } from "react-native";

export type ProgressBarProps = {
    progress: number;
    min?: number;
    max?: number;
    backgroundColor?: ThemeViewProps['color'];
    progressColor?: ThemeViewProps['color'];
    height?: number;
}

export function ProgressBar(props: ProgressBarProps) {
    const {
        progress, 
        min = 0, max = 100,
        backgroundColor = 'bg-secondary',
        progressColor = 'primary',
        height = 4,
    } = props;

    const animatedValue = useAnimatedValue(progress);

    useEffect(() => {
        Animated.spring(animatedValue, {
            toValue: Math.min(Math.max(progress, min), max),
            useNativeDriver: false,
        }).start();
    }, [progress])

    return (
        <ThemeView color={backgroundColor} style={{width: '100%', borderRadius: height, overflow: 'hidden'}} >
            <ThemeView color={progressColor} 
                style={{
                    borderRadius: height,
                    height,
                    width: animatedValue.interpolate({
                        inputRange: [min, max],
                        outputRange: ['0%', '100%']
                    })
                }} 
            />
        </ThemeView>
    )
}