import { Input, InputProps } from "@core";

export type TextInputProps = InputProps & {
    type?: 'string' | 'integer' | 'decimal' | `decimal-${number}`;
};

export function TextInput(props: TextInputProps) {
    const {type, ...inputProps} = props;

    return (
        <Input
            {...inputProps}
            keyboardType={(() => {
                if(props.keyboardType) return props.keyboardType;
                if(type === 'string') return 'default';
                if(type === 'integer') return 'number-pad';
                return 'decimal-pad';
            })()}
        />
    )
}