import { Icon, Show, ThemeText, ThemeView } from "@core";
import { TextInput, View } from "react-native";
import { InputVariantProps } from "..";
import { useThemeStore } from "@theme";
import { colorMix, toRgba } from "@shared/utils/theme";
import { useAnimatedValue } from "@hooks";
import { useEffect } from "react";

export default function InsideLabel(props: InputVariantProps) {
    const {
        label,
        icon,
        preChild,
        postChild,
        errorMsg = '',
        isFocused,
        fontSize = 14,
        containerProps,
        backgroundColor,
        color = 'bg-secondary',
        ...inputProps
    } = props;

    const colors = useThemeStore(store => store.colors);
    const animatedColor = useAnimatedValue(0);

    useEffect(() => {
        const toValue = (() => {
            if(errorMsg.trim() && isFocused) return 3;
            if(errorMsg.trim() && !isFocused) return 2;
            if(!errorMsg.trim() && isFocused) return 1;
            return 0;
        })();

        const animation = animatedColor.springAnimation({
            toValue, useNativeDriver: false, speed: 12, bounciness: 6
        });

        animation.start();
        () => animation.stop();
    }, [isFocused, errorMsg]);

    return (
        <View {...containerProps} style={[{ gap: 4 }, containerProps?.style]} >
            <ThemeView
                style={{
                    borderRadius: 12,
                    padding: 8,
                    paddingBottom: 0,
                    borderWidth: 1,
                    borderColor: animatedColor.interpolate({
                        inputRange: [0, 1, 2, 3],
                        outputRange: [
                            toRgba(colors['text-secondary'], 20),
                            colorMix(colors['primary'], 40, colors["bg-secondary"]),
                            colorMix(colors['error'], 40, colors["bg-secondary"]),
                            colors['error']
                        ]
                    }),

                    backgroundColor: animatedColor.interpolate({
                        inputRange: [0, 1, 2, 3],
                        outputRange: [
                            toRgba(backgroundColor ?? colors[color]),
                            colorMix(colors['primary'], 80, colors["bg-secondary"]),
                            colorMix(colors['error'], 80, colors["bg-secondary"]),
                            colorMix(colors['error'], 80, colors["bg-secondary"])
                        ]
                    }),
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }} >
                    {icon && <Icon name={icon} size={fontSize + 2} />}

                    <ThemeText 
                        color="text-secondary" 
                        style={{ fontSize: 12, fontWeight: "500" }} 
                    >
                        {label}
                    </ThemeText>
                </View>

                <View 
                    style={{ 
                        position: "relative", 
                        alignItems: "center", 
                        flexDirection: "row"
                    }} 
                >
                    {preChild ? preChild : null}

                    <TextInput
                        {...inputProps}
                        placeholderTextColor={toRgba(colors['text-secondary'], 60)}
                        style={[{flex: 1, color: colors['text'], fontSize}, inputProps.style]}
                    />

                    {postChild ? postChild : null}
                </View>
            </ThemeView>

            <Show when={!!errorMsg}>
                <ThemeText color="error" style={{fontSize: 12, paddingLeft: 6}} numberOfLines={2} >
                    {errorMsg}
                </ThemeText>
            </Show>

            {containerProps?.children}
        </View>
    )
}