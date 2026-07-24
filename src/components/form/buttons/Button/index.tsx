import { useEffect, useLayoutEffect, useMemo, useState } from "react";

import {
    RippleContainer,
    type RippleContainerProps,
    Show,
    Icon,
    type IconName,
    ThemeText,
    ThemeTextProps,
} from "@core";

import { SpinnerLoader, type SpinnerLoaderProps } from "@components";
import { getButtonStyle } from "../utils";
import { ButtonVariant } from "../types";
import { useThemeStore } from "@theme";
import { toRgba } from "@shared/utils/theme";
import { GestureResponderEvent } from "react-native";

type LocalStates = Partial<Pick<ButtonProps, 'title' | 'startIcon' | 'endIcon' | 'color' | 'loading'>>

export type ButtonProps = Omit<
    RippleContainerProps,
    "rippleColor" | "rippleScale" | 'onPress'
> & {
    title: string;

    startIcon?: IconName;
    endIcon?: IconName;
    variant?: ButtonVariant;
    rounded?: number;
    fontSize?: number;
    height?: number;

    titleProps?: Omit<ThemeTextProps, 'children'>;

    autoDisabled?: boolean;
    loading?: boolean;
    loaderName?: SpinnerLoaderProps["name"];
    onPress?: ( event: GestureResponderEvent, {handleState, reset}: { 
        handleState: <K extends keyof LocalStates>(key: K, val: LocalStates[K]) => void;
        reset: () => void;
    }) => void;
};

export function Button({
    title,
    startIcon,
    endIcon,
    variant = "soft",
    color = "primary",
    loading = false,
    loaderName,
    style,
    disabled = false,
    height = 40,
    fontSize,
    rounded = 12,
    onPress,
    autoDisabled = true,
    titleProps,
    ...props
}: ButtonProps) {
    
    
    const [states, setStates] = useState<LocalStates>({});
    function handleState<K extends keyof LocalStates>(key: K, val: typeof states[K]) {
        setStates((prev) => ({ ...prev, [key]: val }));
    }

    if(!fontSize) fontSize = Math.floor(height * 0.4);

    title = states.title ?? title;
    startIcon = states.startIcon ?? startIcon;
    endIcon = states.endIcon ?? endIcon;
    color = states.color ?? color;
    loading = states.loading ?? loading;
    
    if(autoDisabled) {
        disabled = disabled || loading;
    }
    
    const theme = useThemeStore(({ colors }) => {
        if (["text", "bg"].includes(color ?? "")) {
            return {
                bgColor: colors[color],
                textColor: colors[color === "text" ? "bg" : "text"],
            };
        }

        return {
            bgColor: colors[color],
            textColor: "rgb(255, 255, 255)",
        };
    });
    
    const { text, bg, border } = useMemo(() => {
        return getButtonStyle({
            variant,
            text: toRgba(theme.textColor),
            bg: toRgba(theme.bgColor),
        });
    }, [theme, variant]);

    return (
        <RippleContainer
            {...props}
            rippleColor={text}
            rippleScale={2}
            disabled={disabled}
            style={{
                backgroundColor: bg,
                borderColor: border,
                flexDirection: "row",
                gap: Math.floor(fontSize / 2),
                alignItems: "center",
                justifyContent: "center",
                paddingInline: 12,
                height,
                borderRadius: rounded,
                borderWidth: 1,
                ...style,

                opacity: disabled ? 0.8 : 1,
            }}

            onPress={(event) => onPress?.(event, {handleState, reset: () => setStates({})})}
        >
            <Show
                when={!loading}
                otherwise={
                    <SpinnerLoader
                        name={loaderName}
                        size={fontSize}
                        customColor={text}
                    />
                }
            >
                <Show when={!!startIcon}>
                    <Icon
                        name={startIcon as IconName}
                        size={fontSize}
                        customColor={text}
                    />
                </Show>
            </Show>

            <ThemeText 
                {...titleProps} 
                textColor={titleProps?.textColor || text} 
                style={[{ fontSize }, titleProps?.style]}
            >
                {title}
            </ThemeText>

            <Show when={!!endIcon}>
                <Icon
                    name={endIcon as IconName}
                    size={fontSize}
                    customColor={text}
                />
            </Show>
        </RippleContainer>
    );
}
