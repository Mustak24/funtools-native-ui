import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Animated, useAnimatedValue } from "react-native";
import { ANIMATIONS, createAnimationStyle } from "./animations";
import { ShowWithAnimationProps } from "./types";
import { ThemeView } from "../ThemeView";
import { Show } from "../Show";

export { type ShowWithAnimationProps }

export function ShowWithAnimation(props: ShowWithAnimationProps) {
    let {
        when,
        children,
        containerProps,
        animationStyle,
        otherwise = null,
        removeOnHide = false,
        animationType = 'fade',
        animationConfig = { duration: 300 },
        onShowAnimationEnd,
        onHideAnimationEnd,
        ...wrapperProps
    } = props;

    removeOnHide = removeOnHide === undefined || removeOnHide;
    

    if(animationStyle && !animationStyle.otherwise) {
        animationStyle.otherwise = {...animationStyle.children};
    }

    animationStyle = (() => {
        if(animationStyle) return animationStyle;

        const defaultAnimationStyle = ANIMATIONS[animationType];
        if(!defaultAnimationStyle.otherwise) {
            defaultAnimationStyle.otherwise = {
                ...defaultAnimationStyle.children
            }
        }

        return defaultAnimationStyle;
    })();

    const childrenJsAnimatedValue = useAnimatedValue(when ? 0 : -1);
    const childrenNativeAnimatedValue = useAnimatedValue(when ? 0 : -1);

    const otherwiseJsAnimatedValue = useAnimatedValue(when ? -1 : 0);
    const otherwiseNativeAnimatedValue = useAnimatedValue(when ? -1 : 0);

    const [isChildrenShow, setIsChildrenShow] = useState(when);
    const [isOtherwiseShow, setIsOtherwiseShow] = useState(!when);

    const visibility = useRef({children: when, otherwise: !when});

    const styles = useMemo(()=> ({
        children: createAnimationStyle({
            jsAnimatedValue: childrenJsAnimatedValue,
            nativeAnimatedValue: childrenNativeAnimatedValue,
            animationStyle: animationStyle.children
        }),
        otherwise: createAnimationStyle({
            jsAnimatedValue: otherwiseJsAnimatedValue,
            nativeAnimatedValue: otherwiseNativeAnimatedValue,
            animationStyle: animationStyle.otherwise ?? animationStyle.children
        })
    }), [animationStyle]);

    function Animate(value: Animated.Value, toValue: number, useNativeDriver: boolean) {
        return Animated.timing(value, {
            toValue, useNativeDriver, ...animationConfig
        })
    }

    function handleShow() {
        setIsChildrenShow(true);
        visibility.current = {children: true, otherwise: false};

        Animated.parallel([
            Animate(childrenJsAnimatedValue, 0, false),
            Animate(childrenNativeAnimatedValue, 0, true),
            Animate(otherwiseJsAnimatedValue, 1, false),
            Animate(otherwiseNativeAnimatedValue, 1, true)
        ]).start(() => {
            if(visibility.current.otherwise) return;

            setIsOtherwiseShow(false);
            otherwiseJsAnimatedValue.setValue(-1);
            otherwiseNativeAnimatedValue.setValue(-1);
            onShowAnimationEnd?.children?.();
            onHideAnimationEnd?.otherwise?.();
        })
    }


    function handleHide() {
        setIsOtherwiseShow(true);
        visibility.current = {children: false, otherwise: true};
        
        Animated.parallel([
            Animate(otherwiseJsAnimatedValue, 0, false),
            Animate(otherwiseNativeAnimatedValue, 0, true),
            Animate(childrenJsAnimatedValue, 1, false),
            Animate(childrenNativeAnimatedValue, 1, true)
        ]).start(() => {
            if(visibility.current.children) return;
            
            setIsChildrenShow(false);
            childrenJsAnimatedValue.setValue(-1);
            childrenNativeAnimatedValue.setValue(-1);
            onShowAnimationEnd?.otherwise?.();
            onHideAnimationEnd?.children?.();
        })
    }


    useLayoutEffect(() => {
        when ? handleShow() : handleHide();
    }, [when])

    return (
        <Show when={ removeOnHide ? (isChildrenShow || (!!otherwise && isOtherwiseShow)) : true } >
            <ThemeView
                {...containerProps}
                style={[
                    containerProps?.style, {
                        position: 'relative', alignItems: 'center', justifyContent: 'center',
                        display: (isChildrenShow || (!!otherwise && isOtherwiseShow)) ? 'flex' : 'none'
                    }]}
            >
                <Show when={removeOnHide ? isChildrenShow : true} >
                    <Animated.View
                        {...wrapperProps}
                        style={[
                            wrapperProps.style, 
                            styles.children, 
                            {
                                display: isChildrenShow ? 'flex' : 'none',
                                position: when ? 'relative' : otherwise ? 'absolute' : 'relative'
                            }
                        ]}
                    >
                        { children }
                    </Animated.View>
                </Show>

                <Show when={!!otherwise && (removeOnHide ? isOtherwiseShow : true)} >
                    <Animated.View
                        {...wrapperProps}
                        style={[
                            wrapperProps.style, 
                            styles.otherwise, 
                            {
                                display: isOtherwiseShow ? 'flex' : 'none',
                                position: when ? 'absolute' : 'relative'
                            }
                        ]}
                    >
                        { otherwise }
                    </Animated.View>
                </Show>
            </ThemeView>
        </Show>
    )
}