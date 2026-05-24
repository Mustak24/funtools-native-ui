import { useMemo } from "react";

import {
    RippleContainer,
    type RippleContainerProps,
    Show,
    Icon,
    type IconName,
    ThemeText,
} from "@core";

import { SpinnerLoader, type SpinnerLoaderProps } from "@components";
import { getButtonStyle } from "../utils";
import { ButtonVariant } from "../types";
import { useThemeStore } from "@theme";
import { toRgba } from "@shared/utils/theme";

export type ButtonProp = Omit<
    RippleContainerProps,
    "rippleColor" | "rippleScale"
> & {
    title: string;

    startIcon?: IconName;
    endIcon?: IconName;
    variant?: ButtonVariant;
    rounded?: number;
    fontSize?: number;

    loading?: boolean;
    loaderName?: SpinnerLoaderProps["name"];
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
    fontSize = 16,
    rounded = 12,
    ...props
}: ButtonProp) {
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
                height: 40,
                borderRadius: rounded,
                borderWidth: 1,
                ...style,

                opacity: disabled ? 0.8 : 1,
            }}
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

            <ThemeText textColor={text} style={{ fontSize }}>
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
