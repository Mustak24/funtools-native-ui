import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { TextInputProps, ViewProps } from "react-native";
import OutsideLabel from "./variants/OutsideLabel";
import { IconName } from "../Icon";
import InsideLabel from "./variants/InsideLabel";
import { ColorState } from "@theme";


export type InputVariant = 'outside-label' | 'inside-label';
export type InputVariantProps = TextInputProps & {
    isFocused: boolean
    label?: string;
    icon?: IconName;
    preChild?: ReactNode;
    postChild?: ReactNode;
    errorMsg?: string;
    fontSize?: number;
    disabled?: boolean;
    containerProps?: ViewProps;
    color?: ColorState;
    backgroundColor?: string;
}

export type InputProps = Omit<InputVariantProps, 'isFocused'> & {
    variant?: InputVariant;
    errorHandler?: (val: string) => (string | undefined | void);
};

export function Input(props: InputProps) {
    const {
        variant = 'outside-label',
        errorMsg: _errorMsg = '',
        errorHandler,
        ...inputProps
    } = props;


    const validationState = useRef({ shouldValidate: false, hasTyped: false, text: props.value ?? '' });

    const [errorMsg, setErrorMsg] = useState(_errorMsg);
    const [isFocused, setIsFocused] = useState(false);


    function updateErrorMsg() {
        if(!validationState.current.shouldValidate) return;
        if(!validationState.current.hasTyped) return;

        const newErrorMsg = errorHandler?.(validationState.current.text);
        setErrorMsg(newErrorMsg || "");
    }


    useEffect(() => {
        if(!_errorMsg.trim()) return;
        validationState.current.shouldValidate = true;
        validationState.current.hasTyped = true;
        
        setErrorMsg(_errorMsg);
    }, [_errorMsg]);

    useEffect(() => {
        if(!props.value) return;

        validationState.current.hasTyped = true;
        validationState.current.text = props.value;
        updateErrorMsg();
    }, [props.value]);

    const Input = {
        'outside-label': OutsideLabel,
        'inside-label': InsideLabel
    }[variant];

    return (
        <Input 
            {...inputProps} 
            isFocused={isFocused}
            errorMsg={errorMsg} 
            readOnly={props.disabled ? true : props.readOnly}
            editable={props.disabled ? false : props.editable}

            containerProps={{
                ...inputProps.containerProps,
                style: [
                    inputProps.containerProps?.style,
                    { opacity: inputProps.disabled ? 0.5 : 1 }
                ]
            }}

            onChangeText={text => {
                props.onChangeText?.(text);
                validationState.current.hasTyped = true;
                validationState.current.text = text;
                updateErrorMsg();
            }}
            
            onBlur={(event) => {
                props.onBlur?.(event);
                validationState.current.shouldValidate = validationState.current.hasTyped;
                setIsFocused(false);
                updateErrorMsg();
            }}

            onFocus={(event) => {
                props.onFocus?.(event);
                setIsFocused(true);
            }}

        />
    )
}