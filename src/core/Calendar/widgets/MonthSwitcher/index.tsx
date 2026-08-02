import { Button, IconButton, SnapView } from "@components";
import { useThemeStore } from "@theme";
import { View } from "react-native";
import { MONTHS_SHORTS } from "../../consts";
import { YearSelector } from "../YearSelectorDialog";
import { useState } from "react";

export type MonthSwitcherProps = {
    month: number;
    year: number;
    onChangeValue: (value: {month: number, year: number}) => void;
    onPressMonth?: (value: {month: number, year: number}) => void;
    disabledYearSelector?: boolean;
}

export function MonthSwitcher(props: MonthSwitcherProps) {
    let {
        month = 0,
        year = new Date().getFullYear(),
        onChangeValue,
        onPressMonth,
        disabledYearSelector = false
    } = props;

    month = month % 12;

    const colors = useThemeStore(store => store.colors);

    const [showYearSelector, setShowYearSelector] = useState(false);

    return (
        <View
            style={{
                width: '100%',
                borderRadius: 100,
                padding: 2,
                borderColor: colors.text,
                borderWidth: 2,
                flexDirection: 'row',
                gap: 4
            }}
        >
            <IconButton
                variant="text"
                color="text"
                size={32}
                icon="ChevronLeft"
                onPress={() => onChangeValue(month === 0 ? {month: 11, year: year - 1} : {month: month - 1, year})}
            />

            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} >
                <SnapView
                    scrollIndex={month}
                    scrollEnabled={false}
                    pointerEvents="box-none"
                    data={MONTHS_SHORTS}
                    itemLayoutLength={120}
                    height={32}
                    initialScrollIndex={month}
                    keyExtractor={item => item}
                    renderItem={({item, index}) => (
                        <Button
                            variant="text"
                            color="text"
                            height={32}
                            title={`${item}, ${year}`}
                            onPress={() => {
                                onPressMonth?.({month: index, year});
                                if(!disabledYearSelector) setShowYearSelector(true);
                            }}
                            titleProps={{style: {fontWeight: 'semibold'}}}
                        />
                    )}
                />
            </View>

            <IconButton
                variant="text"
                color="text"
                size={32}
                icon="ChevronRight"
                onPress={() => onChangeValue(month === 11 ? {month: 0, year: year + 1} : {month: month + 1, year})}
            />

            <YearSelector
                visible={showYearSelector}
                onClose={() => setShowYearSelector(false)}
                
                month={month}
                year={year}
                onSelect={({month, year}) => onChangeValue({month, year})}
            />
        </View>
    )
}