import { Animated, ColorValue } from "react-native";
import { ThemeViewProps } from "../ThemeView";

export type AnimationType = 'fade';

export type AnimationStyleValue = (
    [number, number, number] | [number, number] |
    [string, string, string] | [string, string]
)

export type AnimationStyleProperties = {
    width?: AnimationStyleValue;
    height?: AnimationStyleValue;
    
    top?: AnimationStyleValue;
    bottom?: AnimationStyleValue;
    left?: AnimationStyleValue;
    right?: AnimationStyleValue;

    margin?: AnimationStyleValue;
    marginTop?: AnimationStyleValue;
    marginBottom?: AnimationStyleValue;
    marginLeft?: AnimationStyleValue;
    marginRight?: AnimationStyleValue;

    padding?: AnimationStyleValue;
    paddingTop?: AnimationStyleValue;
    paddingBottom?: AnimationStyleValue;
    paddingLeft?: AnimationStyleValue;
    paddingRight?: AnimationStyleValue;

    opacity?: AnimationStyleValue;

    scale?: AnimationStyleValue;
    scaleX?: AnimationStyleValue;
    scaleY?: AnimationStyleValue;

    translateX?: AnimationStyleValue;
    translateY?: AnimationStyleValue;

    rotate?: AnimationStyleValue;
    rotateX?: AnimationStyleValue;
    rotateY?: AnimationStyleValue;
    rotateZ?: AnimationStyleValue;
    
    skewX?: AnimationStyleValue;
    skewY?: AnimationStyleValue;

    perspective?: AnimationStyleValue;
}

export type AnimationStyle = {
    children: AnimationStyleProperties;
    otherwise?: AnimationStyleProperties;
}

export type ShowWithAnimationProps = ThemeViewProps & {
    when: boolean;
    children: React.ReactNode;
    otherwise?: React.ReactNode;
    removeOnHide?: boolean;
    animationType?: AnimationType;
    animationStyle?: AnimationStyle
    containerProps?: ThemeViewProps;
    animationConfig?: Omit<Animated.TimingAnimationConfig, 'toValue' | 'useNativeDrive'>
}