import { RippleContainer, type RippleContainerProps, ShowWhen, Icon, type IconName, ThemeText } from '@core';
import { type ButtonSize, type ButtonVariants } from '../utils/types';
import { type RANGE } from '@shared/types/number.type';
import { getButtonStyle } from '../utils/functions';
import { BUTTON_LAYOUT } from '../utils/constance';
import { SpinnerLoader, type SpinnerLoaderProps } from '@components';

type ButtonProp = Omit<RippleContainerProps, 'rippleColor' | 'rippleScale'> & {
  title: string;

  startIcon?: IconName;
  endIcon?: IconName;
  variant?: ButtonVariants;
  size?: ButtonSize;
  rounded?: number | `${RANGE<0, 100>}%`;

  loading?: boolean;
  loaderName?: SpinnerLoaderProps['name']
};


export function Button({ title, startIcon, endIcon, variant = 'soft', color = 'primary', size = 'md', rounded, loading = false, loaderName, style, disabled=false, ...props}: ButtonProp) {
  
  const { color: textColor, borderColor, backgroundColor } = getButtonStyle(variant, color);

  const {fontSize, ...containerStyle} = {
    ...BUTTON_LAYOUT[size], 
    ...rounded !== undefined ? {borderRadius: rounded} : {}
  };

  return (
    <RippleContainer
      {...props}
      rippleColor={textColor}
      rippleScale={2}
      disabled={disabled}
      style={{ 
        backgroundColor, borderColor, flexDirection: 'row', gap: Math.floor(fontSize / 2), alignItems: 'center', justifyContent: 'center',
        ...containerStyle, 
        ...style,
        opacity: disabled ? 0.8 : 1,
      }}
    >
      <ShowWhen when={!loading}
        otherwise={
            <SpinnerLoader name={loaderName} size={fontSize} customColor={textColor} />
        }
      >
        <ShowWhen when={!!startIcon}>
            <Icon name={startIcon as IconName} size={fontSize} customColor={textColor} />
        </ShowWhen>
      </ShowWhen>

      <ThemeText textColor={textColor} style={{fontSize}} >{title}</ThemeText>
      
      <ShowWhen when={!!endIcon}>
        <Icon name={endIcon as IconName} size={fontSize} customColor={textColor} />
      </ShowWhen>
    </RippleContainer>
  );
}