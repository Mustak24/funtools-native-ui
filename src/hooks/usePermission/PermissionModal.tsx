import { Permission, PermissionsAndroid, PermissionStatus, View } from "react-native";
import { CenterModalProps, CenterModal, Button } from "@components";
import { ThemeText } from "@core";
import getPermissionInfo from "./getPermissionInfo";
import { RenderModalUIProps } from ".";


export type PermissionModalProps = Omit<CenterModalProps, 'children' | 'preventCloseRequest'> & {
    onDeny: () => void;
    permission: Permission
    permissionStatus: PermissionStatus;
    requestPermission: () => void;
    description?: string;
    renderModalUI?: RenderModalUIProps;
}

export function PermissionModal({ permission, requestPermission, onDeny, permissionStatus, description, renderModalUI, ...props }: PermissionModalProps) {

    const info = getPermissionInfo(permission);

    if(renderModalUI) {
        return renderModalUI({
            requestPermission, 
            permissionStatus, 
            content: info, 
            setIsModalVisible: props.setVisible,
            permission
        })
    }

    return (
        <CenterModal {...props}
            preventCloseRequest={true}
            style={{borderRadius: 20, padding: 8}} 
        >
            <View style={{gap: 24}} >
                <View style={{alignItems: 'center', width: '100%', gap: 8}} >
                    <ThemeText style={{fontSize: 24, fontWeight: '600'}} >
                        Permission Required
                    </ThemeText>

                    <ThemeText color="text-secondary" style={{fontSize: 16, textAlign: 'center', paddingHorizontal: 8}} >
                        {description ?? info.description}
                    </ThemeText>
                </View>

                <View style={{flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'flex-end', width: '100%'}} >
                    <Button
                        color="primary" variant="solid"
                        title={permissionStatus === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN ? 'Settings' : 'Allow'} 
                        onPress={requestPermission} 
                    />

                    <Button 
                        title="Deny" 
                        onPress={onDeny} 
                        variant="outlined" color="text" 
                    />
                </View>
            </View>
        </CenterModal>
    )
}