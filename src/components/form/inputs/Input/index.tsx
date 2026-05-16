import { toRgba } from "@shared/utils/theme";
import { useThemeStore } from "@theme";
import { TextInput, TextInputProps } from "react-native";


export type InputProps = TextInputProps & {
    useTrim?: boolean;
    color?: string;
}

export function Input({placeholderTextColor, onChangeText, color, style, ...props}: InputProps) {

    const colors = useThemeStore(store => store.colors);
    const textColor = Object.keys(colors).includes(color ?? "") ? colors[color as keyof typeof colors] : color;

    return (
        <TextInput
            {...props}
            placeholderTextColor={placeholderTextColor ?? toRgba(colors["text-secondary"], 0.8)}
            style={[{color: textColor ?? colors.text}, style]}
        />
    )
}