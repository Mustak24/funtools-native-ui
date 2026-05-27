import { StyleSheet, View, ViewProps } from "react-native";

export default function Footer(props: ViewProps) {
    return (
        <View {...props} 
            style={[
                styles.container,
                props.style
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