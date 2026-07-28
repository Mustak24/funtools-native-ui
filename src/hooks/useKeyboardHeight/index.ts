import { useEffect, useState } from "react";
import { Animated, Keyboard, useAnimatedValue } from "react-native";

export type UseKeyboardHeightOptions = {
    offset?: number;
};

export function useKeyboardHeight({ offset = 0 }: UseKeyboardHeightOptions = {}) {
    const [height, setHeight] = useState(offset);
    const animatedHeight = useAnimatedValue(offset);

    useEffect(() => {
        const keyboardShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
            const { height } = event.endCoordinates;
            setHeight(height + offset);
            Animated.spring(animatedHeight, {
                toValue: height + offset,
                useNativeDriver: false
            }).start();
        });
        
        const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setHeight(offset);
            Animated.spring(animatedHeight, {
                toValue: offset,
                useNativeDriver: false
            }).start();
        });

        return () => {
            keyboardShowListener.remove();
            keyboardHideListener.remove();
        };
    }, [offset])

    return {
        animatedHeight,
        height
    }
}