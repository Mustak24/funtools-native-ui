import { ACTION } from "@shared/types/common";
import { runAction } from "@shared/utils/common";
import { useLayoutEffect, useRef } from "react";
import { Animated } from "react-native";

class AnimatedValue extends Animated.Value {
    value: number;

    constructor(value: number) {
        super(value);
        this.value = value;
    }

    setValue(action: ACTION<number>) {
        const value = runAction(action, this.value);
        this.value = value;
        super.setValue(value);
    }

    springAnimation(configs: Animated.SpringAnimationConfig) {
        return Animated.spring(this, configs);
    }

    timingAnimation(configs: Animated.TimingAnimationConfig) {
        return Animated.timing(this, configs);
    }    
}

export function useAnimatedValue(initialValue: number) {
    const animatedValue = useRef(new AnimatedValue(initialValue)).current;

    useLayoutEffect(() => {
        animatedValue.addListener(({ value }) => {
            if(value !== animatedValue.value) {
                animatedValue.value = value;
            }
        });

        return () => {
            animatedValue.removeAllListeners();
        };
    }, []);

    return animatedValue;
}