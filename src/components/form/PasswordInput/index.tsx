import { TextInput, TextInputProps } from '../TextInput';
import { useState } from 'react';
import { PanelSwitcher } from '../../logic';
import { IconButton } from '../../primitives/buttons';


export type PasswordInputProps = Omit<TextInputProps, 'postChild'>


export function PasswordInput( props: PasswordInputProps): React.JSX.Element {
    let {
        label = 'Password',
        placeholder = 'eg. *********',
        ...inputProps
    } = props;

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <TextInput
            {...inputProps}
            label={label}
            placeholder={placeholder}
            secureTextEntry={!isPasswordVisible}
            postChild={
                <PanelSwitcher
                    alpha={0}
                    
                    style={{ height: 28, alignItems: 'center', justifyContent: 'center' }}
                    activePanelValue={isPasswordVisible ? 'Eye' : 'EyeOff'}
                    
                    panels={
                        [ 'Eye', 'EyeOff' ].map(icon => ({
                            value: icon,
                            content: <IconButton
                                size={28}
                                color='text'
                                variant='text'
                                icon={icon as 'Eye' | 'EyeOff'}
                                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                            />
                        }))
                    }
                />
            }
        />
    );
}
