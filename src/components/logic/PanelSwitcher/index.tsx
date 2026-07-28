import { ShowWithAnimationProps, ThemeView, ThemeViewProps } from "@core";
import { ReactNode } from "react";
import Panels from "./Panels";

export type PanelSwitcherProps = {
    activePanelValue: string;
    panels: Array<{ value: string; content: ReactNode }>;
    animationStyle?: ShowWithAnimationProps['animationStyle'],
    contentContainerProps?: ShowWithAnimationProps;
    removePanelOnHide?: boolean,
} & Omit<ThemeViewProps, 'children'>

export function PanelSwitcher(props: PanelSwitcherProps) {
    const {
        activePanelValue,
        panels,
        animationStyle,
        removePanelOnHide,
        contentContainerProps,
        ...themeViewProps
    } = props;

    return (
        <ThemeView {...themeViewProps}
            style={[
                {position: 'relative'},
                themeViewProps.style
            ]}
        >
            <Panels
                activePanelValue={activePanelValue}
                panels={panels}
                animationStyle={animationStyle}
                removePanelOnHide={removePanelOnHide}
                contentContainerProps={contentContainerProps}

            />
        </ThemeView>
    )
}