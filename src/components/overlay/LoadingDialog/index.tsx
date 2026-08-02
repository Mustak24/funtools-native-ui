import { StyleSheet, View } from "react-native";
import { Dialog } from "../Dialog";
import { SpinnerLoader } from "../../feedback";
import { ThemeText } from "@core";
import { SnapView } from "../../container";

export type LoadingDialogProps = {
    visible: boolean;
    title?: string;
    subtitles?: string[];
}

export function LoadingDialog({ visible, title, subtitles = [] }: LoadingDialogProps) {
    return (
        <Dialog visible={visible}>
            <View style={[styles.container]} >
                <SpinnerLoader size={32} color="text" name="LoaderCircle" />
                <View style={[styles.container_view]} >
                    <ThemeText style={[styles.title]} >
                        {title ?? 'Please Wait'}
                    </ThemeText>

                    <SnapView
                        itemLayoutLength={20}
                        showDots={false}
                        data={subtitles}
                        direction="vertical"
                        renderItem={({item}) => (
                            <ThemeText color="text-secondary" style={[styles.subtitle]} >
                                {item}
                            </ThemeText>
                        )}
                    />
                </View>
            </View>
        </Dialog>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        padding: 8,
        height: 200
    },
    container_view: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'semibold'
    },
    subtitle: {
        textAlign: 'center'
    }
})