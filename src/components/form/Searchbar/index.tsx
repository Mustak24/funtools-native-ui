import { useRef } from "react";
import { TextInput, TextInputProps } from "../TextInput";
import { Show } from "@core";
import { IconButton } from "../../primitives/buttons";

export type SearchbarProps = Omit<TextInputProps, 'postChild'> & {
    onSearch?: (value: string) => void;
    debounceTime?: number;
}

export function Searchbar(props: SearchbarProps) {
    const {
        onSearch,
        debounceTime = 500,
        placeholder = "Search...",
        ...inputProps
    } = props;

    const timeout = useRef<any>(null);

    function handleTextChange(text: string) {
        props.onChangeText?.(text);
        
        if(timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
            onSearch?.(text);
        }, debounceTime);
    }

    return (
        <TextInput
            {...inputProps}
            placeholder={placeholder}
            icon="Search"
            onChangeText={handleTextChange}
            postChild={
                <Show when={!!inputProps.value?.trim()} >
                    <IconButton
                        icon="X"
                        size={24}
                        variant="text"
                        color="text"
                    />
                </Show>
            }
        />
    )
}