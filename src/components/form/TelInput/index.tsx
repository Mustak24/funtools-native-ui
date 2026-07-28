import { TextInput, TextInputProps } from "../TextInput";
import CountryCodeSelector from "./CountryCodeSelector";

export type TelInputProps = Omit<TextInputProps, 'type' | 'keyboardType' | 'maxLength' | 'value' | 'onChangeText' | 'icon'> & {
    value: { code: string, number: string },
    onChangeValue?: (val: { code: string, number: string }) => void
}

export function TelInput(props: TelInputProps) {
    let {
        value,
        onChangeValue,
        label = 'Phone Number',
        placeholder = "eg. xxxxx-xxxxx",
        ...inputProps
    } = props;

    if(!value.code) value.code = '+91'


    return (
        <TextInput
            {...inputProps}
            label={label}
            type="integer"
            placeholder={placeholder}
            value={value.number}
            onChangeText={val => onChangeValue?.({ ...value, number: val })}
            preChild={
                <CountryCodeSelector
                    value={value.code}
                    disabled={props.disabled}
                    onChangeValue={val => onChangeValue?.({ ...value, code: val })}
                />
            }
        />
    )
}