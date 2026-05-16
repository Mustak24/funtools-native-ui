import { Animated, ViewStyle } from "react-native";
import { AnimationStyle, AnimationStyleProperties, AnimationStyleValue, AnimationType } from "./types";

export const ANIMATIONS: Record<AnimationType, AnimationStyle> = {
    fade: {
        children: {
            opacity: [0, 1],
            scale: [0.8, 1]
        }
    }
}


type CreateAnimationStyleParams = {
    jsAnimatedValue: Animated.Value;
    nativeAnimatedValue: Animated.Value;
    animationStyle: AnimationStyleProperties;
}

export function createAnimationStyle({jsAnimatedValue, nativeAnimatedValue, animationStyle}: CreateAnimationStyleParams): ViewStyle {   
    const keys = Object.keys(animationStyle) as (keyof AnimationStyleProperties)[];

    const style: ViewStyle = {};
    const transform: ViewStyle['transform'] & {}[] = [];

    for(let key of keys) {
        if(
            key === 'perspective' ||
            key === 'skewX' || key === 'skewY' || 
            key === 'translateX' ||  key === 'translateY' ||
            key === 'scale' || key === 'scaleX' || key === 'scaleY' ||
            key === 'rotate' || key === 'rotateX' || key === 'rotateY' || key === 'rotateZ'
        ) {
            transform.push({
                [key]: nativeAnimatedValue.interpolate({
                    inputRange: [-1, 0, 1],
                    outputRange: [...animationStyle[key]!, ...animationStyle[key]!].slice(0, 3) as AnimationStyleValue
                })
            })
        } else if(key === 'opacity') {
            style.opacity = nativeAnimatedValue.interpolate({
                inputRange: [-1, 0, 1],
                outputRange: [...animationStyle[key]!, ...animationStyle[key]!].slice(0, 3) as AnimationStyleValue
            })
        } else {
            style[key] = jsAnimatedValue.interpolate({
                inputRange: [-1, 0, 1],
                outputRange: [...animationStyle[key]!, ...animationStyle[key]!].slice(0, 3) as AnimationStyleValue
            })
        }
    }

    return {
        ...style,
        transform
    }
}