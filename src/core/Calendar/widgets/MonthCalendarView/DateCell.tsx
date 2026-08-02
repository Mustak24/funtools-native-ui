import { ThemeText } from "../../../ThemeText";
import { memo } from "react";
import { useThemeStore } from "@theme";
import { View } from "react-native";
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

export const DateCell = memo(function DateCell({date, month, year, value, size, onPress}: DateCellProps) {
    const colors = useThemeStore(store => store.colors);

    if (date === null) {
        return <View style={{ width: size, height: size }} />;
    }

    const isSelected = value &&
        date === value.getDate() && 
        month === value.getMonth() && 
        year === value.getFullYear();

    const isToday = date === new Date().getDate() && 
        month === new Date().getMonth() && 
        year === new Date().getFullYear();

    const backgroundColor = isSelected 
        ? colors.primary 
        : isToday 
        ? toRgba(colors["bg-secondary"], 50) 
        : 'transparent';

    const textColor = isSelected ? colors['bg-secondary'] : colors["text"];

    return (
        <View  
            style={{
                position: 'relative',
                width: size, 
                height: size, 
                aspectRatio: 1, 
                alignItems: 'center', 
                justifyContent: 'center',
                borderRadius: 12,
                overflow: 'hidden',
                backgroundColor
            }} 
        >
            <ThemeText 
                style={{ position: 'absolute' }} 
                textColor={textColor}
            >
                {date}
            </ThemeText>

            <RippleContainer 
                style={{width: '100%', height: '100%'}}
                onPress={onPress}
            />
        </View>
    );
});