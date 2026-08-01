import { ThemeText } from "../../../ThemeText";
import { useAnimatedValue } from "@hooks";
import { useEffect } from "react";
import { useThemeStore } from "@theme";
import { Animated } from "react-native";
import { RippleContainer } from "../../../RippleContainer";
import { toRgba } from "@shared/utils/theme";

export type DateCellProps = {
    date: number | null;
    month: number;
    year: number;
    size: number;
    onPress: () => void;
    value?: Date;
}

export function DateCell({date, month, year, value, size, onPress}: DateCellProps) {

    const colors = useThemeStore(store => store.colors);
    const background = useAnimatedValue(1);

    useEffect(() => {
        const state = (() => {
            if(
                value &&
                date === value.getDate() && 
                month === value.getMonth() && 
                year === value.getFullYear()
            ) return 3;

            if(
                date === new Date().getDate() && 
                month === new Date().getMonth() && 
                year === new Date().getFullYear()
            ) return 2;
            
            return 1;
        })();
        
        const animation = background.timingAnimation({
            toValue: state, useNativeDriver: false, duration: 100
        });

        animation.start();
        return () => animation.stop();
    }, [date, value])

    return (
        <Animated.View  
            style={{
                position: 'relative',
                width: size, height: size, 
                aspectRatio: 1, 
                alignItems: 'center', 
                justifyContent: 'center',
                borderRadius: 12,
                overflow: 'hidden',
                backgroundColor: background.interpolate({
                    inputRange: [1, 2, 3],
                    outputRange: ['rgba(0,0,0,0)', toRgba(colors["bg-secondary"], 50), colors.primary]
                }),
            }} 
        >
            <ThemeText 
                style={{ position: 'absolute'}} 
                textColor={background.interpolate({
                    inputRange: [1, 2, 3],
                    outputRange: [colors["text"], colors["text"], colors['bg-secondary']]
                })}    
            >{date}</ThemeText>

            <RippleContainer 
                style={{width: '100%', height: '100%'}}
                onPress={onPress}
            />
        </Animated.View>
    )
}