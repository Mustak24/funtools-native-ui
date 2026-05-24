import { toRgba } from "@shared/utils/theme";
import { useThemeStore } from "@theme";
import { TextInput, TextInputProps } from "react-native";


export type InputProps = Omit<TextInputProps, "placeholderTextColor"> & {
    useTrim?: boolean;
    color?: string;
}

export function Input({onChangeText, color, style, ...props}: InputProps) {

    const colors = useThemeStore(store => store.colors);
    const textColor = colors.hasOwnProperty(color ?? '')  ? colors[color as keyof typeof colors] : color;

    return (
        <TextInput
            {...props}
            placeholderTextColor={toRgba(textColor ?? colors.text, 0.8)}
            style={[{color: textColor ?? colors.text}, style]}
        />
    )
}