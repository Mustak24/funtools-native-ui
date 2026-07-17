import { ScrollView, ScrollViewProps } from "react-native";
import { useDrawerContext } from ".";

export default function Content(props: ScrollViewProps) {
    const { padding } = useDrawerContext()
    return (
        <ScrollView 
            {...props} 
            showsVerticalScrollIndicator={props.showsVerticalScrollIndicator ?? false}
            style={[
                {width: '100%', flex: 1},
                props.style,
                { paddingInline: padding }
            ]} 
        >
            {props.children}
        </ScrollView>
    )
}