import { Animated } from "react-native";

const interpol = new Animated.Value(0).interpolate;
export type AnimatedInterpolValue = ReturnType<typeof interpol>;