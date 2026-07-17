import { Show, ThemeText } from "@core";
import { StyleSheet, View, ViewProps } from "react-native";
import { useDrawerContext } from ".";

type Props = {
    title?: string;
    description?: string;
} & ViewProps

export default function Header(props: Props) {
    const {
        title,
        description,
        children
    } = props;

    const { padding } = useDrawerContext()

    return (
        <View {...props} 
            style={[
                styles.container,
                props.style,
                { padding, paddingBottom: 0 }
            ]}
        >
            <View style={{display: (title || description) ? 'flex' : 'none', flex: 1}} >
                <Show when={!!title} >
                    <ThemeText 
                        style={{fontSize: 20, fontWeight: 'bold', width: '100%'}} 
                        numberOfLines={1}
                    >
                        {title}
                    </ThemeText>
                </Show>

                <Show when={!!description} >
                    <ThemeText 
                        color="text-secondary" 
                        style={{fontSize: 12, width: '100%'}} 
                        numberOfLines={3} 
                    >
                        {description}
                    </ThemeText>
                </Show>
            </View>

            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        gap: 4,
    }
});