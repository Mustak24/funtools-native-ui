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
        min = new Date(value.getFullYear() - 30, 0),
        max = new Date(value.getFullYear() + 30, 11),
        ...dialogProps
    } = props;

    const [date, setDate] = useState(value);

    const yy = date.getFullYear(), mm = date.getMonth(), dd = date.getDate();

    const YEARS = useMemo(() => {
        const YEARS = [];
        let year = min.getFullYear();
        for(let i=0; i<(max.getFullYear() - min.getFullYear()) * 12; i++) {
            if(i % 12 === 0) year += 1;
            YEARS.push({year, month: i % 12});
        }
        return YEARS;
    }, [min, max]);
    

    return (
        <Dialog {...dialogProps} 
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
                    value={mm}
                    onChangeValue={mon => setDate(new Date(yy, mon, dd))}
                    renderLabel={(_, label) => `${label}, ${yy}`}
                />
            </Dialog.Header>

            <Dialog.Content>
                <View style={{width: '100%', alignItems: 'center'}} >
                    <SnapView
                        data={YEARS}
                        windowSize={3}
                        removeClippedSubviews={true}
                        initialNumToRender={1}
                        maxToRenderPerBatch={2}

                        width={(44 * 7 + 12)}
                        height={44 * 7 + 12}
                        initialScrollIndex={YEARS.findIndex(info => info.year === yy && info.month === mm)}
                        scrollIndex={YEARS.findIndex(info => info.year === yy && info.month === mm)}
                        
                        onScrollIndexChange={idx => {
                            const {year, month} = YEARS[idx];
                            setDate(new Date(year, month, dd));
                        }}

                        renderItem={({item}) => (
                            <MonthCalendarView
                                value={date}
                                onChangeValue={setDate}
                                month={item.month}
                                year={item.year}
                            />
                        )}
                    />
                </View>
            </Dialog.Content>

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
                        onSelect?.(date); 
                        props.onClose?.()
                    }}
                />
            </Dialog.Footer>
        </Dialog>
    )
}