import { ShowWithAnimation } from "@core";
import { PanelSwitcherProps } from ".";
type PanelProps = Pick<PanelSwitcherProps, 'activePanelValue' | 'panels' | 'animationStyle' | 'removePanelOnHide'>;

export default function Panels(props: PanelProps) {
    const {
        activePanelValue,
        panels,
        animationStyle,
        removePanelOnHide
    } = props

    if(panels.length === 0) return null;

    return (
        <ShowWithAnimation
            when={panels[0].value === activePanelValue}
            containerProps={{style: {flex: 1, width: '100%'}}}
            style={{flex: 1, width: '100%'}}
            removeOnHide={removePanelOnHide}
            
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