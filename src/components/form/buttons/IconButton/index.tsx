import { useMemo, useState } from "react";
import {
    Icon,
    type IconName,
    Show,
    RippleContainer,
    type RippleContainerProps,
} from "@core";
import { SpinnerLoader, type SpinnerLoaderProps } from "@components";
import { getButtonStyle } from "../utils";
import { ButtonVariant } from "../types";
import { useThemeStore } from "@theme";
import { toRgba } from "@shared/utils/theme";
import { GestureResponderEvent } from "react-native";


type LocalStates = Partial<Pick<IconButtonProps, 'icon' | 'color' | 'loading'>>;

export type IconButtonProps = Omit<RippleContainerProps, 'rippleColor' | 'rippleScale' | 'onPress'> & {
    icon: IconName;

    autoDisabled?: boolean;
    variant?: ButtonVariant;
    size?: number;
    iconSize?: number;
    rounded?: number;
    loading?: boolean;
    loaderName?: SpinnerLoaderProps["name"];
    onPress?: (event: GestureResponderEvent, {handleState, reset}: { 
        handleState: <K extends keyof LocalStates>(key: K, val: LocalStates[K]) => void;
        reset: () => void;
    }) => void;
};

export function IconButton({
    variant = "soft",
    color = "primary",
    icon,
    size = 40,
    iconSize,
    rounded = 40,
    loading = false,
    loaderName,
    disabled = false,
    autoDisabled = false,
    ...props
}: IconButtonProps) {

    const [states, setStates] = useState<LocalStates>({});
    
    function handleState<K extends keyof LocalStates>(key: K, val: LocalStates[K]) {
        setStates(prev => ({...prev, [key]: val}));
    }
    
    function resetStates() {
        setStates({});
    }

    if(!iconSize) iconSize = Math.floor(size * 0.6);

    icon = states.icon ?? icon;
    color = states.color ?? color;
    loading = states.loading ?? loading;

    if(autoDisabled === undefined || autoDisabled) {
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
            disabled={disabled}
            rippleScale={2}
            rippleColor={text}
            style={{
                opacity: disabled ? 0.8 : 1,
                height: size,
                width: size,
                aspectRatio: 1,
                borderRadius: rounded,
                borderWidth: 1,
                borderColor: border,
                backgroundColor: bg,
                alignItems: "center",
                justifyContent: "center",
            }}

            onPress={(event) => props.onPress?.(event, {handleState, reset: resetStates})}
        >
            <Show
                when={!loading}
                otherwise={
                    <SpinnerLoader
                        name={loaderName}
                        size={iconSize}
                        customColor={text}
                    />
                }
            >
                <Icon
                    customColor={text}
                    name={icon}
                    size={iconSize}
                />
            </Show>
        </RippleContainer>
    );
}
