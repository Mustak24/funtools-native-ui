import { Button, IconButton } from "../../components/form";
import { Dialog } from "../../components/overlay/Dialog";
import { StyleSheet, View } from "react-native";
import { Icon, Show, ThemeText } from "@core";
import { usePopupContext } from "./Provider";


export function Popup({id}: {id: string}) {
    const { popups, hidePopup, cleanupPopups } = usePopupContext();

    const popup = popups.find(popup => popup.id === id);
    if(!popup) return null;
    
    const { 
        icon, 
        title, 
        visible, 
        actions, 
        subtitle, 
        closeAfterAction, 
        styles: customStyles, 
        blockSystemCloseRequest 
    } = popup;

    return (
        <Dialog 
            visible={visible}
            onHide={cleanupPopups}
            onClose={() => hidePopup(id)}
            blockSystemCloseRequest={blockSystemCloseRequest ?? false}
            containerProps={{style: styles.dialog}}
            style={[{padding: 12}, customStyles?.dialog]}
            maxWidth={typeof customStyles?.dialog?.maxWidth === 'number' ? customStyles.dialog.maxWidth : 440}
            maxHeight={typeof customStyles?.dialog?.maxWidth === 'number' ? customStyles.dialog.maxWidth : undefined}
        >
            <View style={[styles.header]} >
                <IconButton
                    icon="X"
                    color='text'
                    variant="text"
                    onPress={() => hidePopup(id)}
                />
            </View>
            
            <Dialog.Content contentContainerStyle={[styles.content, customStyles?.content]} >
                {   !icon ? null :
                    typeof icon === 'string' ? (
                        <Icon 
                            name={icon} 
                            size={32}
                        />
                    ) : (
                        icon()
                    )
                }

                <ThemeText color="text" style={[styles.title, customStyles?.title]} >
                    {title}
                </ThemeText>

                <Show when={!!subtitle} >
                    <ThemeText color="text-secondary" style={[styles.subtitle, customStyles?.subtitle]} >
                        {subtitle}
                    </ThemeText>
                </Show>
            </Dialog.Content>

            <Dialog.Footer style={[styles.footer, customStyles?.footer]} >
                {
                    actions.map((action, index) => (
                        <Button
                            key={index}
                            {...action}
                            onPress={(event, options) => {
                                if(closeAfterAction === undefined || closeAfterAction) {
                                    hidePopup(id);
                                }

                                action.onPress(event, {
                                    ...options,
                                    hide: () => hidePopup(id)
                                })
                            }}
                            rounded={action.rounded ?? 100}
                        />
                    ))
                }
            </Dialog.Footer>
        </Dialog>
    )
};

const styles = StyleSheet.create({
    dialog: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        padding: 16,
        position: 'relative'
    },
    content: {
        gap: 8,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'absolute',
        top: 4,
        right: 4,
        zIndex: 100,
        width: '100%',
    },
    title: {
        fontSize: 18,
        paddingHorizontal: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'center'
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 8
    }
})