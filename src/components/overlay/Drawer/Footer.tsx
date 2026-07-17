import { StyleSheet, View, ViewProps } from "react-native";
import { useDrawerContext } from ".";

export default function Footer(props: ViewProps) {
    const {padding} = useDrawerContext()
    return (
        <View {...props} 
            style={[
                styles.container,
                props.style,
                { padding, paddingTop: 0 }
            ]}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'flex-end', 
        gap: 4,
    }
});