import { Fragment } from "react/jsx-runtime";
import { TextInput, TextInputProps } from "../TextInput";
import { Icon, MONTHS_SHORTS } from "@core";
import { CalendarDialog } from "../../overlay";
import { useState } from "react";
import { Pressable } from "react-native";

export type DatePickerProps = {
    value: Date;
    onChangeValue: (val: Date) => void;
} & Pick<TextInputProps, 'label' | 'placeholder' | 'variant' | 'required' | 'disabled' | 'postChild' | 'containerProps'>;

export function DatePicker(props: DatePickerProps) {
    const {
        value,
        onChangeValue,
        ...inputProps
    } = props;

    const safeValue = value instanceof Date && !isNaN(value.getTime()) ? value : new Date();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Fragment>
            <TextInput
                {...inputProps}
                value={`${safeValue.getDate()} ${MONTHS_SHORTS[safeValue.getMonth()]}, ${safeValue.getFullYear()}`}
                postChild={inputProps?.postChild ?? <Icon name="ChevronDown"/>}
                pointerEvents="none"
                containerProps={{
                    ...inputProps?.containerProps,
                    children: (
                        <Fragment>
                            {inputProps?.containerProps?.children}
                            <Pressable
                                disabled={inputProps.disabled}
                                style={{position: 'absolute', inset: 0, zIndex: 10, width: '100%', height: '100%'}}
                                onPress={() => {
                                    if(inputProps.disabled) return;
                                    setIsOpen(true);
                                }}
                            />
                        </Fragment>
                    )
                }}
            />

            <CalendarDialog
                visible={isOpen}
                onClose={() => setIsOpen(false)}

                value={safeValue}
                onSelect={onChangeValue}
            />
        </Fragment>
    )
}