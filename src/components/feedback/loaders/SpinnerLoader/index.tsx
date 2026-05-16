import { Animated, useAnimatedValue } from "react-native";
import { Icon, type IconProps } from "@core";
import { useEffect } from "react";

export type SpinnerLoaderProps = Omit<IconProps, 'name'> & {
    name?: keyof typeof LOADERS
}

export function SpinnerLoader({name = 'LoaderPinwheel', ...props}: SpinnerLoaderProps) {

    const animatedValue = useAnimatedValue(0);

    useEffect(() => {
        const animation = Animated.loop(
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            })
        )

        animation.start();
        return () => animation.stop();
    }, [])

    return (
        <Animated.View style={{ 
            alignItems: 'center',
            justifyContent: 'center',
            transform: [
                { 
                    rotate: animatedValue.interpolate({
                        inputRange: [0, 1], outputRange: ['0deg', '360deg']
                    }) 
                }
            ]
        }}>
            { LOADERS[name](props) }
        </Animated.View>
    )

}


const LOADERS = {
    LoaderPinwheel: (props: Omit<IconProps, 'name'>) => <Icon {...props} name="LoaderPinwheel" />,
    LoaderCircle: (props: Omit<IconProps, 'name'>) => <Icon {...props} name="LoaderCircle" />,
    Loader: (props: Omit<IconProps, 'name'>) => <Icon {...props} name="Loader" />,
    LoaderRefresh: (props: Omit<IconProps, 'name'>) => <Icon {...props} name="RefreshCw" />,
}