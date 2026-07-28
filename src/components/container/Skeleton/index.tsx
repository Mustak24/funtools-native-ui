import {ThemeView, ThemeViewProps} from '@core';
import {useEffect} from 'react';
import {Animated, Easing, useAnimatedValue} from 'react-native';


export type SkeletonProps = ThemeViewProps;

export function Skeleton({
    style,
    color = 'bg-secondary',
    ...props
}: SkeletonProps) {
    const opacity = useAnimatedValue(0.4);
    const scale = useAnimatedValue(0.4);

    useEffect(() => {
        const animation = Animated.parallel([
            Animated.loop(
                Animated.sequence([
                    Animated.timing(opacity, {
                        toValue: 1,
                        duration: 700,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),

                    Animated.timing(opacity, {
                        toValue: 0.4,
                        duration: 700,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                ]),
            ),

            Animated.spring(scale, {
                toValue: 1,
                speed: 4,
                bounciness: 12,
                useNativeDriver: true,
            }),
        ]) 

        animation.start();

        return () => animation.stop();
    }, []);

    return <ThemeView 
        {...props} 
        color={color} 
        style={[{
            opacity,
            transform: [{scale}]
        }, style]} 
    />;
}
