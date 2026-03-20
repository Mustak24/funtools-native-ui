import { useMemo } from "react";

import {
    RippleContainer,
    type RippleContainerProps,
    ShowWhen,
    Icon,
    type IconName,
    ThemeText,
} from "@core";

import { SpinnerLoader, type SpinnerLoaderProps } from "@components";
import { getButtonStyle } from "../utils";
import { ButtonVariant } from "../types";
import { Color, useThemeStore } from "@theme";

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
            textColor: "255, 255, 255" as Color,
        };
    });

    const { text, bg, border } = useMemo(() => {
        return getButtonStyle({
            variant,
            text: theme.textColor,
            bg: theme.bgColor,
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
                borderRadius: 12,
                borderWidth: 1,
                ...style,

                opacity: disabled ? 0.8 : 1,
            }}
        >
            <ShowWhen
                when={!loading}
                otherwise={
                    <SpinnerLoader
                        name={loaderName}
                        size={fontSize}
                        customColor={text}
                    />
                }
            >
                <ShowWhen when={!!startIcon}>
                    <Icon
                        name={startIcon as IconName}
                        size={fontSize}
                        customColor={text}
                    />
                </ShowWhen>
            </ShowWhen>

            <ThemeText textColor={text} style={{ fontSize }}>
                {title}
            </ThemeText>

            <ShowWhen when={!!endIcon}>
                <Icon
                    name={endIcon as IconName}
                    size={fontSize}
                    customColor={text}
                />
            </ShowWhen>
        </RippleContainer>
    );
}
