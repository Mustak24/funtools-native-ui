import { Icon, IconName, ThemeText } from "@core";
import { useEffect } from "react";
import { Animated, StyleSheet, useAnimatedValue } from "react-native";

export type EmptyStateProps = {
    title: string;
    description: string
    iconName?: IconName;
}

export function EmptyState({iconName, title, description}: EmptyStateProps) {
    const animatedValue = useAnimatedValue(0);

    useEffect(() => {
        Animated.spring(animatedValue, {
            toValue: 1, useNativeDriver: true, bounciness: 10
        }).start();
    }, [])

    return (
        <Animated.View 
            style={[styles.container, {
                opacity: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.8]
                }),

                transform: [{
                    scale: animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1]
                    })
                }]
            }]} 
        >
            <Icon name={iconName ?? 'Inbox'} size={38} />
            <ThemeText style={styles.title}>
                {title}
            </ThemeText>
            <ThemeText color="text-secondary" style={styles.description}>
                {description}
            </ThemeText>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: 32,
        opacity: 0.8
    },
    title: {
        fontWeight: 700,
        fontSize: 20,
        marginTop: 8
    },
    description: {
        fontWeight: 600,
        fontSize: 12,
        textAlign: 'center',
    }
})