import { RippleContainer, RippleContainerProps } from "@core";
import { toRgba } from "@shared/utils/theme";
import { useThemeStore } from "@theme";

export type PressableViewProps = {
    customColor?: string;
    alpha?: number;
} & Omit<RippleContainerProps, 'rippleColor'>;

export function PressableView(props: PressableViewProps) {
    const {
        color = 'bg-secondary',
        rippleScale = 2,
        customColor,
        alpha = 20
    } = props;

    const colors = useThemeStore(store => store.colors);
    
    return (
        <RippleContainer
            {...props}
            color={color}
            rippleScale={rippleScale}
            style={{
                backgroundColor: customColor ? toRgba(customColor, alpha) : toRgba(colors[color], alpha),
                ...props.style,
            }}
        />
    )
}