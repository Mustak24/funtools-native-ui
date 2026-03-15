import { Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState } from "react";
import { Animated, Modal, ModalProps, PanResponder, StyleSheet, useAnimatedValue, useWindowDimensions, View } from "react-native";
import { ThemeView, type ThemeViewProps, RippleContainer } from "@core";
import { useThemeStore, type ColorStates } from "@theme";



export type CenterModalProps = Omit<ModalProps, 'animationType'> & {
    children: ReactNode,
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>,
    preventCloseRequest?: boolean,
    containerProps?: ThemeViewProps,
    backdropVariant?: ColorStates,
    onClose?: () => void,
    backgroundContent?: ReactNode,
    closeVelocity?: number,
    backdropColor?: string,
}


export function CenterModal({children, visible, setVisible, preventCloseRequest=false, onRequestClose, style, containerProps, backdropColor, backdropVariant='bg-secondary-90', onClose, backgroundContent, closeVelocity=2, ...props}: CenterModalProps) {

    const backgroundColor = useThemeStore(states => { 
        if(backdropColor) return backdropColor;
        return states.colors[backdropVariant]
    });

    const {width: windowWidth, height: windowHeight} = useWindowDimensions();

    const [show, setShow] = useState(visible);
    
    const animatedValue = useAnimatedValue(0);

    const translate = useRef(new Animated.ValueXY({x: 0, y: 0})).current;

    const {panHandlers} = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, gestureState) => {
            return Math.abs(gestureState.dy) > 5;
        },

        onPanResponderTerminationRequest: () => false,

        onPanResponderMove: (_, {dx, dy}) => {
            translate.setValue({x: dx, y: dy});
        },

        onPanResponderRelease: (_, {vx, vy, dx, dy}) => {
            const isNearEdge = [
                Math.abs(dx) > windowWidth * 0.4, 
                Math.abs(dy) > windowHeight * 0.4
            ].some(Boolean);
            
            const isMovingFast = [Math.abs(vx) > closeVelocity, Math.abs(vy) > closeVelocity].some(Boolean);

            if((isNearEdge || isMovingFast) && !preventCloseRequest) {
                return setVisible(false);
            }

            Animated.spring(translate, {
                toValue: {x: 0, y: 0},
                bounciness: 12,
                useNativeDriver: true
            }).start()
        }

    })).current;

    function handleClose() {
        setTimeout(() => setShow(false), 150)

        Animated.spring(animatedValue, {
            toValue: 0,
            bounciness: 12,
            useNativeDriver: true
        }).start(() => {
            onClose?.();
        })
    }

    function handleOnRequestClose() {
        if(preventCloseRequest) return;
        
        setVisible(false);
    }

    useEffect(() => {        
        if(visible){
            setShow(true);
            translate.setValue({x: 0, y: 0});
            
            Animated.spring(animatedValue, {
                toValue: 1,
                bounciness: 12,
                useNativeDriver: true
            }).start()
        } else {
            handleClose();
        }
    }, [visible])

    
    return (
        <Modal {...props} 
            visible={show}
            transparent
            animationType={'fade'}
            onRequestClose={handleOnRequestClose}
        >
            <View style={styles.backgroundContainer} >
                {backgroundContent}
            </View>

            <Animated.View
                style={[styles.contentContainer, {
                    opacity: animatedValue,
                    backgroundColor
                }]}
            >
                <RippleContainer style={styles.ripple} onPress={handleOnRequestClose} rippleOpacity={0.2} />
                
                <Animated.View {...panHandlers}
                    style={{
                        width: '100%', padding: 8, position: 'relative',
                        opacity: animatedValue,
                        transform: [
                            {translateX: translate.x}, {translateY: translate.y}, 
                            {scale: animatedValue.interpolate({inputRange: [0, 1], outputRange: [0.4, 1]})}
                        ]
                    }}
                >
                    <ThemeView
                        {...containerProps}
                        style={[{ borderRadius: 12, padding: 4 }, style, {overflow: 'hidden', width: '100%'}]} 
                    >
                        {children}
                    </ThemeView>
                </Animated.View>
                
                <RippleContainer style={styles.ripple} onPress={handleOnRequestClose} rippleOpacity={0.2} />
            </Animated.View>
        </Modal>
    )
}



const styles = StyleSheet.create({
    backgroundContainer: {
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: -1
    },
    contentContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1
    },
    ripple: {
        flex: 1,
        width: '100%'
    }
})