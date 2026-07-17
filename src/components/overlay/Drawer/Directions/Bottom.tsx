import { ThemeView, ThemeViewProps } from "@core";
import { useDrawerContext } from "..";
import { Animated } from "react-native";

export default function Bottom({alpha, color, backgroundColor,  ...props}: ThemeViewProps) {
    const { MAX_HEIGHT, animatedValue, rounded } = useDrawerContext();

    return (
        <Animated.View
            {...props}
            style={[
                { gap: 8 }, 
                props.style,
                {
                    bottom: 0,
                    marginLeft: 0, marginRight: 0, marginTop: 0, marginBottom: 0,
                    paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0,
                    position: 'absolute',
                    width: '100%',
                    maxHeight: '90%',
                    transform: [{translateY: animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [MAX_HEIGHT, 0],
                    })}]
                }
            ]}
        >
            <ThemeView
                alpha={alpha}
                color={color}
                backgroundColor={backgroundColor}
                style={{
                    top: 0, left: 0,
                    position: 'absolute', 
                    width: '100%', height: '200%', 
                    borderTopLeftRadius: rounded,
                    borderTopRightRadius: rounded,
                }}
            />

            {props.children}
        </Animated.View>
    )
}