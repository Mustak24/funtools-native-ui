import { ShowWithAnimation } from "@core";
import { PanelSwitcherProps } from ".";

type PanelProps = Pick<PanelSwitcherProps, 'activePanelValue' | 'panels' | 'animationStyle' | 'removePanelOnHide' | 'contentContainerProps'>;

export default function Panels(props: PanelProps) {
    const {
        activePanelValue,
        panels,
        animationStyle,
        removePanelOnHide,
        contentContainerProps
    } = props

    if(panels.length === 0) return null;

    return (
        <ShowWithAnimation
            {...contentContainerProps}
            when={panels[0].value === activePanelValue}
            removeOnHide={contentContainerProps?.removeOnHide ?? removePanelOnHide}

            containerProps={{
                ...contentContainerProps?.containerProps, 
                style: {height: '100%', width: '100%'}, 
                alpha: 0
            }}
            
            style={[{height: '100%', width: '100%'}, contentContainerProps?.style]}
            
            otherwise={
                <Panels {...props} panels={panels.slice(1)}  />
            }

            animationStyle={animationStyle ?? {
                children: {
                    scale: [0.9, 1, 1.1],
                    opacity: [0, 1, 0],
                }
            }}
        >
            {panels[0].content}
        </ShowWithAnimation>
    )
}