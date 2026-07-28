import { Fragment, useState } from "react";
import { TextInput, TextInputProps } from "../TextInput";
import { ItemSelector, ItemSelectorProps } from "../../overlay";
import { Pressable } from "react-native";
import { Icon, IconName, ThemeText } from "@core";

type DATA = {
    value: string;
    [key: string]: any
}

export type SelectProps<T extends DATA> = {
    value: string;
    onChangeValue: (val: string) => void;
    renderLabel?: (value: string) => string;
    label?: string;
    placeholder?: string;
    icon?: IconName;
    required?: boolean;
    disabled?: boolean;
    variant?: TextInputProps['variant'];
    renderItem?: ItemSelectorProps<T>['renderItem'];
    selectorTitle?: string;

    inputProps?: Omit<
        TextInputProps, 
        'value' | 'onChangeText' | 'readOnly' | 'variant' | 'required'  | 'disabled' | 'placeholder' | 'icon'
    >;

} & Omit<
    ItemSelectorProps<T>, 
    'keyExtractor' | 'visible' | 'onClose' | 'renderItem' | 'title' | 'onSelectItem' | 'isSelected'
>;


export function Select<T extends DATA>(props: SelectProps<T>) {
    const {
        value,
        onChangeValue,
        renderLabel,
        inputProps,
        renderItem,
        selectorTitle,
        variant,
        required,
        disabled,
        ...selectorProps
    } = props;

    const [isOptionVisible, setIsOptionVisible] = useState(false);

    function handleSelectItem(item: T) {
        onChangeValue(item.value);
        setIsOptionVisible(false);
    }

    return (
        <Fragment>
            <TextInput
                {...inputProps}
                readOnly
                variant={variant}
                value={renderLabel?.(value) ?? value}
                postChild={inputProps?.postChild ?? <Icon name="ChevronDown"/>}
                pointerEvents="none"
                containerProps={{
                    ...inputProps?.containerProps,
                    children: (
                        <Pressable 
                            style={{position: 'absolute', inset: 0, zIndex: 10, width: '100%', height: '100%'}}
                            onPress={() => setIsOptionVisible(true)}
                        />
                    )
                }}
            />

            <ItemSelector
                {...selectorProps}
                title={selectorTitle ?? `Select ${props.label ?? 'an option'}` }
                visible={isOptionVisible}
                onSelectItem={handleSelectItem}
                onClose={() => setIsOptionVisible(false)}
                keyExtractor={item => item.value}
                isSelected={(item) => item.value === value}
                renderItem={renderItem ?? (({item}) => (
                    <ThemeText>{renderLabel?.(item.value) ?? item.value}</ThemeText>
                ))}
            />
        </Fragment>
    )
}