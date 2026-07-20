import { RippleContainer, ThemeView, ThemeViewProps } from "@core";
import { useAnimatedValue } from "@hooks";
import { ColorState } from "@theme";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Animated, Modal, ModalProps, useWindowDimensions, View } from "react-native";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import Left from "./Directions/Left";
import Right from "./Directions/Right";
import Bottom from "./Directions/Bottom";
import Top from "./Directions/Top";

export type DrawerProps = {
    onClose?: () => void;
    onHide?: () => void;
    direction?: 'top' | 'bottom' | 'left' | 'right';
    containerProps?: Omit<ThemeViewProps, 'children'>;
    backdropVariant?: ColorState;
    backgroundContent?: ReactNode;
    blockSystemCloseRequest?: boolean;
    rounded?: number;
    padding?: number;
} & Omit<ModalProps, 'transparent' | 'animationType'>;


type DrawerComponent = ((props: DrawerProps) => JSX.Element) & {
    Header: typeof Header,
    Content: typeof Content,
    Footer: typeof Footer
}

const context = createContext<null | DrawerProps & {
    animatedValue: Animated.Value,
    MAX_WIDTH: number,
    MAX_HEIGHT: number,
}>(null);

export function useDrawerContext() {
    const ctx = useContext(context);
    if(!ctx) throw new Error('Drawer.Header must be used within a Drawer');
    return ctx;
}

export const Drawer: DrawerComponent = (props: DrawerProps) => {
    let {
        visible,
        children,
        onClose,
        onHide,
        containerProps,
        backgroundContent,
        backdropVariant = 'text-secondary',
        direction = 'bottom',
        rounded = 12,
        padding = 12,
        blockSystemCloseRequest = false,
        ...modalProps
    } = props;

    blockSystemCloseRequest = blockSystemCloseRequest === undefined || blockSystemCloseRequest;
    
    const { width: MAX_WIDTH, height: MAX_HEIGHT } = useWindowDimensions();

    const [show, setShow] = useState(!!visible);
    const animatedValue = useAnimatedValue(0);

    function handleShow() {
        setShow(true);
        Animated.spring(animatedValue, {
            delay: 50,
            toValue: 1,
            useNativeDriver: true,
            speed: 4,
            bounciness: 12
        }).start()
    }

    function handleHide() {
        Animated.spring(animatedValue, {
            toValue: 0,
            useNativeDriver: true,
            speed: 4,
            bounciness: 12
        }).start(() => {
            setShow(false);
            onHide?.();
        })
    }

    function handleClose() {
        if(!blockSystemCloseRequest) {
            onClose?.();
        }
    }

    useEffect(() => {
        !!visible ? handleShow() : handleHide();
    }, [visible])

    return (
        <context.Provider value={{
            ...props, 
            animatedValue,
            rounded, padding,
            MAX_HEIGHT, MAX_WIDTH,
        }} >
            <Modal
                {...modalProps}
                visible={show}
                transparent
                animationType="none"
                onRequestClose={(event) => {
                    modalProps.onRequestClose?.(event);
                    handleClose();
                }}
            >
                <ThemeView
                    alpha={60}
                    color={backdropVariant}
                    style={{
                        flex: 1, 
                        width: '100%', 
                        height: '100%', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        opacity: animatedValue,
                        position: 'relative'
                    }}
                >
                    <View style={{
                        position: "absolute",
                        flex: 1,
                        width: "100%",
                        height: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: -1
                    }} >
                        {backgroundContent}
                    </View>

                    <View style={{width: '100%', height: '100%', position: 'relative'}} >
                        <RippleContainer
                            style={{position: 'absolute', flex: 1, width: MAX_WIDTH, height: MAX_HEIGHT, top: 0, left: 0}}
                            onPress={handleClose}
                            rippleOpacity={0.2}
                        />

                        {{
                            'left': <Left 
                                {...containerProps} 
                                children={children} 
                            />,

                            'right': <Right 
                                {...containerProps} 
                                children={children} 
                            />,
                            
                            'top': <Top
                                {...containerProps}
                                children={children}
                            />,
                            
                            'bottom': <Bottom 
                                {...containerProps} 
                                children={children} 
                            />,
                        }[direction]}
                    </View>
                </ThemeView>
            </Modal>
        </context.Provider>
    )
}

Drawer.Header = Header;
Drawer.Content = Content;
Drawer.Footer = Footer;
