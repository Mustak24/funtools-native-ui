import React from "react";
import * as icons from "lucide-react-native";
import { type LucideProps } from "lucide-react-native";
import { useThemeStore } from "@theme";
import { type ColorState } from "@theme";
import { toRgba } from "@shared/utils/theme";

export type IconName = keyof typeof icons;

export type IconProps = LucideProps & {
    name: IconName;

    size?: number;
    color?: ColorState;
    alpha?: number;
    customColor?: string;
};

export function Icon({
    name,
    size = 16,
    color = "text",
    alpha = 100,
    customColor,
    ...props
}: IconProps) {
    const colors = useThemeStore((states) => {
        return customColor ?? toRgba(states.colors[color], alpha);
    });

    const LucideIcon = icons[name] as React.ComponentType<LucideProps>;

    // @ts-expect-error
    return <LucideIcon {...props} color={colors} size={size} />;
}
