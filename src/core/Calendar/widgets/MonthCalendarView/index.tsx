import { useMemo } from "react";
import { getMonthDayGrid } from "../../utils";
import { ThemeView } from "../../../ThemeView";
import { View } from "react-native";
import { DateCell } from "./DateCell";
import { ThemeText } from "../../../ThemeText";

export type MonthCalendarViewProps = {
    value?: Date,
    onChangeValue: (date: Date) => void;

    year?: number;
    month?: number;
    celSize?: number;
}

export function MonthCalendarView(props: MonthCalendarViewProps) {
    const {
        value,
        year = new Date().getFullYear(), 
        month = new Date().getMonth(),
        onChangeValue,
        celSize = 44
    } = props;

    const GRID = useMemo(() => {
        return getMonthDayGrid(year, month);
    }, [year, month]);

    return (
        <ThemeView style={{gap: 2}} >
            <View style={{flexDirection: 'row', gap: 2}} >
                {
                    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <View
                            key={day}
                            style={{
                                width: celSize, height: celSize,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }} 
                        >
                            <ThemeText style={{fontSize: 12}} >
                                {day}
                            </ThemeText>
                        </View>
                    ))
                }
            </View>
            {
                GRID.map((row, index) => (
                    <View key={index} style={{flexDirection: 'row', gap: 2}} >
                        {
                            row.map((date, index) => (
                                <DateCell
                                    key={index}
                                    date={date}
                                    value={value}
                                    month={month}
                                    year={year}
                                    size={celSize}
                                    onPress={() => date && (onChangeValue(new Date(year, month, date)))}
                                />
                            ))
                        }
                    </View>
                ))
            }
        </ThemeView>
    )
}