import { Button, IconButton, SnapView } from "@components";
import { useThemeStore } from "@theme";
import { View } from "react-native";
import { MONTHS_SHORTS } from "../../consts";

export type MonthSwitcherProps = {
    value: number;
    onChangeValue: (month: number) => void;
    onPressMonth?: (month: number) => void;
    renderLabel?: (month: number, label: string) => string;
}

export function MonthSwitcher(props: MonthSwitcherProps) {
    let {
        value = 0,
        onChangeValue,
        onPressMonth,
        renderLabel
    } = props;

    value = value % 12;

    const colors = useThemeStore(store => store.colors);

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
                onPress={() => onChangeValue(value === 0 ? 11 : value - 1)}
            />

            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} >
                <SnapView
                    scrollIndex={value}
                    onScrollIndexChange={onChangeValue}
                    data={MONTHS_SHORTS}
                    height={32}
                    width={120}
                    initialScrollIndex={value}
                    renderItem={({item, index}) => (
                        <Button
                            variant="text"
                            color="text"
                            height={32}
                            title={renderLabel?.(index, item) ?? item}
                            onPress={() => onPressMonth?.(index)}
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
                onPress={() => onChangeValue(value === 11 ? 0 : value + 1)}
            />
        </View>
    )
}