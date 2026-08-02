import { RippleContainer, ThemeView, ThemeViewProps } from "@core";
import { ReactNode, useEffect, useState } from "react";
import { Animated, Modal, ModalProps, useAnimatedValue, useWindowDimensions, View } from "react-native";
import Content from "./Content";
import Header from "./Header";
import Footer from "./Footer";
import { ColorState } from "@theme";

type DialogProps = {
    onClose?: () => void;
    onHide?: () => void;
    containerProps?: ThemeViewProps;
    maxWidth?: number | `${number}%`;
    maxHeight?: number | `${number}%`;
    inlineMargin?: number | `${number}%`;
    blockMargin?: number | `${number}%`;
    backdropVariant?: ColorState;
    backgroundContent?: ReactNode;
    blockSystemCloseRequest?: boolean;
    animationConfig?: {
        speed?: number;
        bounciness?: number;
    }
} & Omit<ModalProps, 'transparent' | 'animationType'>;

type DialogComponent = ((props: DialogProps) => JSX.Element) & {
    Header: typeof Header;
    Content: typeof Content;
    Footer: typeof Footer;
}

const Dialog: DialogComponent = (props: DialogProps) => {
    let {
        visible,
        children,
        onClose,
        onHide,
        maxWidth = Infinity,
        maxHeight = Infinity,
        inlineMargin = 32,
        blockMargin = '20%',
        containerProps,
        backdropVariant = 'text-secondary',
        backgroundContent,
        animationConfig,
        blockSystemCloseRequest = false,
        ...modalProps
    } = props;

    if(animationConfig?.speed) animationConfig.speed = 5;
    if(animationConfig?.bounciness) animationConfig.bounciness = 20;

    const { width, height } = useWindowDimensions();
    const animatedValue = useAnimatedValue(0);

    const [show, setShow] = useState(!!visible);

    function getMarginValue(margin: number | `${number}%`, total: number) {
        if(typeof margin === 'number') {
            return margin;
        }

        const val = parseInt(margin.replace('%', ''));
        return Math.floor(total * (val / 100))
    }

    function handleShow() {
        setShow(true);
        Animated.spring(animatedValue, {
            delay: 50,
            toValue: 1,
            useNativeDriver: true,
            ...animationConfig
        }).start()
    }

    function handleHide() {
        Animated.spring(animatedValue, {
            toValue: 0,
            useNativeDriver: true,
            ...animationConfig
        }).start(() => {
            setShow(false);
            onHide?.();
        })
    }

    function handleClose() {
        if(!blockSystemCloseRequest) onClose?.();
    }

    useEffect(() => {
        !!visible ? handleShow() : handleHide();
    }, [visible])

    return (
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
                color={backdropVariant}
                alpha={60}
                style={{
                    flex: 1, 
                    width, height, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    opacity: animatedValue
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

                <RippleContainer
                    style={{flex: 1, width: '100%'}}
                    onPress={handleClose}
                    rippleOpacity={0.2}
                />

                <View style={{width: '100%', flexDirection: 'row'}} >
                    <RippleContainer
                        style={{flex: 1}}
                        onPress={handleClose}
                        rippleOpacity={0.2}
                    />

                    <ThemeView 
                        {...containerProps}
                        style={[
                            {
                                width: '100%', 
                                padding: 4,
                                borderRadius: 12,
                                gap: 8,
                            },
                            containerProps?.style,
                            {
                                maxWidth: typeof maxWidth === 'number' ? 
                                    Math.min(maxWidth, (width - getMarginValue(inlineMargin, width))) : 
                                    maxWidth,
                                maxHeight: typeof maxHeight === 'number' ? 
                                    Math.min(maxHeight, (height - getMarginValue(blockMargin, height))) :
                                    maxHeight,
                            },
                            {
                                transform: [
                                    {
                                        scale: animatedValue.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0.8, 1],
                                        })
                                    }
                                ]
                            }
                        ]}
                        >
                        {children}
                    </ThemeView>

                    <RippleContainer
                        style={{flex: 1}}
                        onPress={handleClose}
                        rippleOpacity={0.2}
                    />
                </View>

                <RippleContainer
                    style={{flex: 1, width: '100%'}}
                    onPress={handleClose}
                    rippleOpacity={0.2}
                />
            </ThemeView>
        </Modal>
    )
} 

Dialog.Content = Content;
Dialog.Header = Header;
Dialog.Footer = Footer;

export {
    Dialog,
    type DialogProps
}