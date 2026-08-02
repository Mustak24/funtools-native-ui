import { Button, Dialog, DialogProps, SnapView } from "@components";
import { ThemeText } from "../../../ThemeText";
import { useMemo } from "react";
import { View } from "react-native";

export type YearSelectorProps = DialogProps & {
    month: number;
    year: number;

    min?: Date;
    max?: Date;
    onSelect: ({month, year}: {month: number; year: number}) => void;
}

export function YearSelector(props: YearSelectorProps) {
    const {
        month = 0,
        year = new Date().getFullYear(),
        min = new Date(new Date().getFullYear() - 50, 0),
        max = new Date(new Date().getFullYear() + 50, 11),
        onSelect,
        ...dialogProps
    } = props;

    const {YEARS, scrollIndexMap} = useMemo(() => {
        const years = [], scrollIndexMap = new Map<number, number>();
        for (let y = min.getFullYear(); y <= max.getFullYear(); y++) {
            years.push(y);
            scrollIndexMap.set(y, years.length - 1);
        }
        return {YEARS: years, scrollIndexMap};
    }, [min, max]);

    return (
        <Dialog {...dialogProps} maxWidth={440} >
            <Dialog.Header>
                <ThemeText>Select Year</ThemeText>
            </Dialog.Header>

            <SnapView
                data={YEARS}
                keyExtractor={item => item.toString()}
                itemLayoutLength={40 * 4 + 8}
                direction="vertical"
                windowSize={3}
                removeClippedSubviews={true}
                initialNumToRender={1}
                maxToRenderPerBatch={2}
                width={'100%'}
                initialScrollIndex={scrollIndexMap.get(year)}
                renderItem={({item: yy}) => (
                    <View style={{width: '100%', height: '100%'}} >
                        {
                            [
                                ['Jan', 'Feb', 'Mar'],
                                ['Apr', 'May', 'Jun'],
                                ['Jul', 'Aug', 'Sep'],
                                ['Oct', 'Nov', 'Dec']
                            ].map((row, rowIndex) => (
                                <View 
                                    key={rowIndex}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        width: '100%',
                                        gap: 2
                                    }}
                                >
                                    {
                                        row.map((mon, colIndex) => {
                                            const isSelected = (colIndex + rowIndex * 3) === month && year === yy;
                                            return (
                                                <Button
                                                    key={colIndex}
                                                    title={ `${mon}, ${yy}` }
                                                    variant={isSelected ? "solid" : "text"}
                                                    color={isSelected ? "primary" : "text"}
                                                    style={{flex: 1}}
                                                    onPress={() => onSelect({month: colIndex + rowIndex * 3, year: yy})}
                                                />
                                            )
                                        })
                                    }
                                </View>
                            ))
                        }
                    </View>
                )}
            />
        </Dialog>
    )
}