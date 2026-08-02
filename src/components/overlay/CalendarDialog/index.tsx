import { MonthCalendarView, MONTHS_SHORTS, MonthSwitcher, ThemeText } from "@core";
import { Dialog, DialogProps } from "../Dialog";
import { useMemo, useState } from "react";
import { Button } from "../../primitives";
import { View } from "react-native";
import { SnapView } from "../../container";

export type CalendarDialogProps = DialogProps & {
    value?: Date;
    onSelect: (value: Date) => void;

    min?: Date;
    max?: Date;
}

export function CalendarDialog(props: CalendarDialogProps) {
    const {
        onSelect,
        value = new Date(),
        min = new Date(new Date().getFullYear() - 50, 0),
        max = new Date(new Date().getFullYear() + 50, 11),
        ...dialogProps
    } = props;

    const [selectedDate, setSelectedDate] = useState(value);

    const [visibleMonth, setVisibleMonth] = useState({
        year: value.getFullYear(),
        month: value.getMonth(),
    });

    const yy = selectedDate.getFullYear(), mm = selectedDate.getMonth(), dd = selectedDate.getDate();
 
    const {YEARS, scrollIndexMap} = useMemo(() => {
        const YEARS = [], scrollIndexMap = new Map<string, number>();
        let year = min.getFullYear();
        for(let i=0; i<(max.getFullYear() - min.getFullYear()) * 12; i++) {
            if(i % 12 === 0) year += 1;
            YEARS.push({year, month: i % 12});
            scrollIndexMap.set(`${year}-${i % 12}`, i);
        }
        return {YEARS, scrollIndexMap};
    }, [min, max]);
    

    return (
        <Dialog 
            {...dialogProps} 
            maxWidth={440}
        >
            <Dialog.Header
                style={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: 8,
                    gap: 8
                }}
            >
                <ThemeText style={{fontSize: 12}} >Select Date</ThemeText>
                <ThemeText style={{fontSize: 20, fontWeight: 'bold'}} >
                    {dd} {MONTHS_SHORTS[mm]}, {yy}
                </ThemeText>

                <MonthSwitcher
                    month={visibleMonth.month}
                    year={visibleMonth.year}
                    onChangeValue={({month, year}) => setVisibleMonth({month, year})}
                />
            </Dialog.Header>

            <View style={{width: '100%', alignItems: 'center'}} >
                <SnapView
                    data={YEARS}
                    windowSize={3}
                    removeClippedSubviews={true}
                    initialNumToRender={1}
                    maxToRenderPerBatch={2}
                    itemLayoutLength={44 * 7 + 12}
                    initialScrollIndex={scrollIndexMap.get(`${value.getFullYear()}-${value.getMonth()}`)}
                    scrollIndex={scrollIndexMap.get(`${visibleMonth.year}-${visibleMonth.month}`)}
                    
                    onScrollIndexChange={idx => {
                        const {year, month} = YEARS[idx];
                        setVisibleMonth({...visibleMonth, year, month});
                    }}

                    keyExtractor={item => `${item.year}-${item.month}`}
                    renderItem={({item}) => (
                        <MonthCalendarView
                            value={selectedDate}
                            onChangeValue={setSelectedDate}
                            month={item.month}
                            year={item.year}
                        />
                    )}
                />
            </View>

            <Dialog.Footer>
                <Button
                    variant="outlined"
                    color="text"
                    title="Cancel"
                    onPress={props.onClose}
                />

                <Button
                    variant="solid"
                    color="text"
                    title="Select"
                    onPress={() => {
                        onSelect?.(selectedDate); 
                        props.onClose?.()
                    }}
                />
            </Dialog.Footer>
        </Dialog>
    )
}