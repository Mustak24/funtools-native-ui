import { ThemeView, ThemeViewProps } from "@core";
import { useDrawerContext } from "..";
import { Animated } from "react-native";

export default function Left(props: ThemeViewProps) {
    const { MAX_WIDTH, animatedValue, rounded } = useDrawerContext();

    return (
        <Animated.View
            {...props}
            style={[
                { gap: 8 },
                props.style,
                {
                    left: 0,
                    marginLeft: 0, marginRight: 0, marginTop: 0, marginBottom: 0,
                    paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0,
                    position: 'absolute',
                    height: '100%',
                    width: Math.max(MAX_WIDTH * 0.8, 300),
                    maxWidth: '90%',
                    transform: [{translateX: animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-MAX_WIDTH, 0],
                    })}]
                }
            ]}
        >
            <ThemeView
                alpha={props.alpha}
                color={props.color}
                backgroundColor={props.backgroundColor}
                style={{
                    right: 0, top: 0,
                    position: 'absolute', 
                    width: '200%', height: '100%', 
                    borderTopLeftRadius: rounded,
                    borderBottomLeftRadius: rounded,
                }}
            />

            {props.children}
        </Animated.View>
    )
}