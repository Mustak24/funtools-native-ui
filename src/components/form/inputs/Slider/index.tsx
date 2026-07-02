import { ThemeText, ThemeView } from "@core";
import { useAnimatedValue } from "@hooks";
import { minMax } from "@shared/utils/common";
import { ColorState, useThemeStore } from "@theme";
import { Dispatch, ReactNode, SetStateAction, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Animated, GestureResponderEvent, PanResponder, Pressable, StyleSheet, View } from "react-native";

export type SliderProps = {
    value?: number;
    minmax?: [number, number];
    onChangeValue?: Dispatch<SetStateAction<number>>;
    onSelectValue?: (value: number) => void;
    renderLabel?: (value: number) => ReactNode;
    height?: number;
    rounded?: number;
    color?: ColorState;
    backgroundColor?: ColorState;

    step?: number;

    thumbProps?: {
        size?: number;
        borderWidth?: number;
        borderColor?: ColorState;
        color?: ColorState;
        rounded?: number;
    }
}

export function Slider(props: SliderProps) {
    let {
        value = 0, 
        onChangeValue, 
        onSelectValue,
        renderLabel,
        height = 10,
        rounded = 10,
        step = 0,
        color = 'primary',
        minmax: [min, max] = [0, 100],
        backgroundColor = 'bg-secondary', 
        thumbProps: _thumbProps = { size: 20, rounded: 20, borderWidth: 2 }
    } = props;

    const colors = useThemeStore(state => state.colors);

    const thumbProps: Required<SliderProps['thumbProps']> = (() => {
        const {size, borderWidth, borderColor, color: thumbColor, rounded: thumbRounded} = _thumbProps;
        const borderWidthFinal = borderWidth ?? Math.max(2, Math.round(height * 0.10));
        const thumbSize = Math.max(height, size ?? height + borderWidthFinal * 2);
        const thumbBorderColor = borderColor ?? backgroundColor;
        const thumbColorFinal = thumbColor ?? color;
        const thumbRoundedFinal = thumbRounded ?? Math.round(thumbSize / 2);

        return {
            size: thumbSize,
            borderWidth: borderWidthFinal,
            borderColor: thumbBorderColor,
            color: thumbColorFinal,
            rounded: thumbRoundedFinal
        }
    })();

    const steps = step > 0 ? Math.floor((max - min) / step) : 0;

    value = minMax(value, min, max);
    
    const [valueState, _setValueState] = useState(value);
    const setValueState = (value: number) => {
        _setValueState(handleValue(value));
    }

    const labelVisibility = useAnimatedValue(0);
    const thumbScale = useAnimatedValue(1);
    const animatedValue = useAnimatedValue(value);
    const animatedValueRef = useRef(value);
    const sliderMeasure = useRef({ x: 0, y: 0, w: 0, h: 0, px: 0, py: 0 });

    const sliderRef = useRef<View>(null);
    const {panHandlers} = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,

            onPanResponderTerminationRequest: () => false,

            onPanResponderStart: () => {
                thumbScale.springAnimation({ 
                    toValue: 1.1, useNativeDriver: false, speed: 2, bounciness: 12 
                }).start();

                labelVisibility.springAnimation({
                    toValue: 1, useNativeDriver: false, speed: 2, bounciness: 12 
                }).start();
            },

            onPanResponderEnd: () => {
                thumbScale.springAnimation({ 
                    toValue: 1, useNativeDriver: false, speed: 2, bounciness: 12 
                }).start();

                labelVisibility.timingAnimation({
                    toValue: 0, 
                    useNativeDriver: false, 
                    duration: 240,
                    delay: 1000
                }).start();
            },

            onPanResponderMove: (_, { dx }) => {
                const changeRate = getSliderChangeRate();
                const valueChange = dx * changeRate;
                const extraValue = rounded * changeRate;
                const newValue = minMax(animatedValueRef.current + valueChange, min - extraValue, max + extraValue);
                animatedValue.setValue(newValue);
                setValueState(minMax(newValue, min, max));
                onChangeValue?.(minMax(newValue, min, max));

                if(Math.round(newValue) % step === 0) {
                    thumbScale.setValue(1);
                    thumbScale.springAnimation({
                        toValue: 1.1, useNativeDriver: false, speed: 2, bounciness: 12 
                    }).start();
                }
                
            },

            onPanResponderRelease: (_, {dx}) => {
                const valueChange = dx * getSliderChangeRate();
                const value = minMax(animatedValueRef.current + valueChange, min, max);
                handleOnChangeValue(value);
            }
        })
    ).current;

    function getSliderChangeRate() {
        return (max - min) / sliderMeasure.current.w;
    }

    function handleValue(value: number) {
        if(steps === 0) return value;
        const stepIndex = Math.round((value - min) / step);
        return min + stepIndex * step;
    }

    function handleOnChangeValue(newValue: number) {
        newValue = handleValue(newValue);
        animatedValueRef.current = newValue;
        animatedValue.springAnimation({
            toValue: newValue, useNativeDriver: false, speed: 2, bounciness: 12
        }).start();
        setValueState(newValue);
        onChangeValue?.(newValue);
        onSelectValue?.(newValue);
    }

    function handleSliderPress(event: GestureResponderEvent) {
        const touchX = event.nativeEvent.pageX - sliderMeasure.current.px;
        const value = minMax(touchX, 0, sliderMeasure.current.w) * getSliderChangeRate();
        handleOnChangeValue(value);
    }
    
    useEffect(() => {
        if (animatedValueRef.current !== value) {
            handleOnChangeValue(value);
        }
    }, [value])

    useLayoutEffect(() => {
        sliderRef.current?.measure((x, y, w, h, px, py) => {
            sliderMeasure.current = { x, y, w, h, px, py };
        });
    }, [])
    
    return (
        <View 
            ref={sliderRef}
            style={[styles.container, {height}]}
        >
            <ThemeView 
                color={backgroundColor} 
                alpha={40}
                style={[styles.background, {
                    height: height, 
                    borderRadius: rounded
                }]}
            >
                {/* {Array.from({length: steps - 1}, (_, i) => (
                    <ThemeView key={i} 
                        color={thumbProps.borderColor}
                        style={{
                            width: Math.max(1, Math.round(height * 0.4)), 
                            height: Math.max(1, Math.round(height * 0.4)),
                            borderRadius: Math.max(1, Math.round(height * 0.4)),
                        }}
                    />
                ))} */}
            </ThemeView>

            <ThemeView 
                color={color} 
                style={[styles.filled, {
                    height: height, 
                    borderRadius: rounded,
                    width: animatedValue.interpolate({
                        inputRange: [min, max],
                        outputRange: ['0%', '100%']
                    })
                }]} 
            />

            <Pressable 
                style={[styles.thumbContainer, { paddingInline: Math.min(rounded, height) }]}
                onPressIn={handleSliderPress}
            >
                <View style={[styles.thumbArea, {height: height}]}>
                    <ThemeView 
                        {...panHandlers}
                        color={thumbProps.color} 
                        style={{
                            borderWidth: thumbProps.borderWidth,
                            height: thumbProps.size + thumbProps.borderWidth * 2, 
                            width: thumbProps.size + thumbProps.borderWidth * 2, 
                            borderRadius: thumbProps.rounded, 
                            borderColor: colors[thumbProps.borderColor],
                            position: "absolute", 
                            transform: [{translateX: '-50%'}, {scale: thumbScale}],
                            left: animatedValue.interpolate({
                                inputRange: [min, max],
                                outputRange: ['0%', '100%']
                            }), 
                        }} 
                    />

                    { 
                        renderLabel ? (
                            <Animated.View
                                style={[styles.thumbLabel, {
                                    transform: [
                                        {translateX: '-50%'}, 
                                        {scale: thumbScale},
                                        {translateY: labelVisibility.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [-thumbProps.size, -(thumbProps.size + thumbProps.borderWidth * 2 + 4)]
                                        })},
                                    ],
                                    left: animatedValue.interpolate({
                                        inputRange: [min, max],
                                        outputRange: ['0%', '100%']
                                    }),
                                    opacity: labelVisibility
                                }]}
                            >
                                {renderLabel(valueState)}
                            </Animated.View>
                        ) : null
                    }
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        alignItems: 'center', 
        position: 'relative', 
        width: '100%',
    },
    background: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%', 
        position: "absolute", 
    },
    filled: {
        position: "absolute", 
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    thumbContainer: {
        width: '100%', 
        position: "absolute",
    },
    thumbArea: {
        width: '100%', 
        position: "relative", 
        alignContent: 'center', 
        justifyContent: 'center'
    },
    thumbLabel: {
        position: 'absolute',
        paddingBlock: 2,
        paddingInline: 4,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    }
})