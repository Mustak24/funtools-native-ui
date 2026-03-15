import { RANGE } from "@shared/types/number.type"
import { Icon, type IconName, ShowWhen, RippleContainer, type RippleContainerProps } from "@core"
import { SpinnerLoader, type SpinnerLoaderProps } from "@components"
import { BUTTON_LAYOUT } from "../utils/constance"
import { getButtonStyle } from "../utils/functions"
import { ButtonSize, ButtonVariants } from "../utils/types"


export type IconButtonProps = RippleContainerProps & {
    icon: IconName,
    
    variant?: ButtonVariants,
    size?: number | ButtonSize,
    rounded?: number | `${RANGE<0, 100>}%`,
    loading?: boolean,
    loaderName?: SpinnerLoaderProps['name']
}

export default function IconButton({variant='soft', color='primary', icon, size='md', rounded='50%', loading=false, loaderName, disabled=false, ...props}: IconButtonProps) {

    const {color: textColor, ...style} = getButtonStyle(variant, color);

    const height = typeof size === 'number' ? size : BUTTON_LAYOUT[size].height;
    const borderWidth = !variant.includes('outline') ? 0 : typeof size === 'number' ? 1 : BUTTON_LAYOUT[size].borderWidth;
    return (
        <RippleContainer {...props}
            disabled={disabled}
            rippleScale={2}
            rippleColor={textColor}
            style={{
                ...style, 
                opacity: disabled ? 0.8 : 1,
                height, borderRadius: rounded, borderWidth, alignItems: 'center', justifyContent: 'center', aspectRatio: 1, 
            }}
        >
            <ShowWhen when={!loading} 
                otherwise={
                    <SpinnerLoader name={loaderName} size={Math.floor(height * 0.6)} customColor={textColor} />
                }
            >
                <Icon customColor={textColor} name={icon} size={Math.floor(height * 0.6)} />
            </ShowWhen>
        </RippleContainer>
    )
}