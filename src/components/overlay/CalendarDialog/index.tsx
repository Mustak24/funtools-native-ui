import { MonthCalendarView, MONTHS_SHORTS, MonthSwitcher, ThemeText } from "@core";
import { Dialog, DialogProps } from "../Dialog";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../../primitives";
import { View } from "react-native";
import { SnapView } from "../../container";
import { PanelSwitcher } from "../../logic";

export type CalendarDialogProps = DialogProps & {
    value?: Date;
    onSelect: (value: Date) => void;

    min?: Date;
    max?: Date;
}

export function CalendarDialog(props: CalendarDialogProps) {
    const safeValue = useMemo(() => {
        return props.value instanceof Date && !isNaN(props.value.getTime()) ? props.value : new Date();
    }, [props.value]);

    const {
        onSelect,
        min = new Date(new Date().getFullYear() - 50, 0),
        max = new Date(new Date().getFullYear() + 50, 11),
        ...dialogProps
    } = props;

    const [selectedDate, setSelectedDate] = useState(safeValue);

    const [visibleMonth, setVisibleMonth] = useState({
        year: safeValue.getFullYear(),
        month: safeValue.getMonth(),
    });

    useEffect(() => {
        if (dialogProps.visible) {
            setSelectedDate(safeValue);
            setVisibleMonth({
                year: safeValue.getFullYear(),
                month: safeValue.getMonth(),
            });
        }
    }, [dialogProps.visible, safeValue]);

    const yy = selectedDate.getFullYear(), mm = selectedDate.getMonth(), dd = selectedDate.getDate();

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
                <MonthCalendarView
                    value={selectedDate}
                    onChangeValue={setSelectedDate}
                    month={visibleMonth.month}
                    year={visibleMonth.year}
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