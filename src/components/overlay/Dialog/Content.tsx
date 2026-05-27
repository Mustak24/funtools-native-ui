import { ScrollView, ScrollViewProps } from "react-native";

export default function Content(props: ScrollViewProps) {
    return (
        <ScrollView 
            {...props} 
            showsVerticalScrollIndicator={props.showsVerticalScrollIndicator ?? false}
            style={[
                {width: '100%'},
                props.style
            ]} 
        >
            {props.children}
        </ScrollView>
    )
}