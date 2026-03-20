import { useMemo } from "react";
import {
    Icon,
    type IconName,
    ShowWhen,
    RippleContainer,
    type RippleContainerProps,
} from "@core";
import { SpinnerLoader, type SpinnerLoaderProps } from "@components";
import { getButtonStyle } from "../utils";
import { ButtonVariant } from "../types";
import { Color, useThemeStore } from "@theme";

export type IconButtonProps = RippleContainerProps & {
    icon: IconName;

    variant?: ButtonVariant;
    size?: number;
    iconSize?: number;
    rounded?: number;
    loading?: boolean;
    loaderName?: SpinnerLoaderProps["name"];
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
    ...props
}: IconButtonProps) {
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
        >
            <ShowWhen
                when={!loading}
                otherwise={
                    <SpinnerLoader
                        name={loaderName}
                        size={iconSize ?? Math.floor(size * 0.6)}
                        customColor={text}
                    />
                }
            >
                <Icon
                    customColor={text}
                    name={icon}
                    size={iconSize ?? Math.floor(size * 0.6)}
                />
            </ShowWhen>
        </RippleContainer>
    );
}
