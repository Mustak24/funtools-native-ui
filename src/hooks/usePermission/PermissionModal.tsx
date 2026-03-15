import { CenterModal } from "@core";
import { CenterModalProps } from "@core";
// import { Button } from "@ui";
import { ThemeText } from "@core";
import { Permission, PermissionsAndroid, PermissionStatus, View } from "react-native";
import getPermissionInfo from "./getPermissionInfo";


export type PermissionModalProps = Omit<CenterModalProps, 'children' | 'preventCloseRequest'> & {
    onDeny: () => void;
    permission: Permission
    permissionStatus: PermissionStatus;
    requestPermission: () => void;
}

export function PermissionModal({ permission, requestPermission, onDeny, permissionStatus, ...props }: PermissionModalProps) {

    const { description } = getPermissionInfo(permission);

    return (
        <CenterModal {...props}
            preventCloseRequest={true}
            style={{borderRadius: 20, padding: 8}} >
            <View style={{gap: 24}} >
                <View style={{alignItems: 'center', width: '100%', gap: 8}} >
                    <ThemeText style={{fontSize: 24, fontWeight: '600'}} >
                        Permission Required
                    </ThemeText>

                    <ThemeText color="text-secondary" style={{fontSize: 16, textAlign: 'center', paddingHorizontal: 8}} >
                        {description}
                    </ThemeText>
                </View>

                <View style={{flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'flex-end', width: '100%'}} >
                    {/* <Button
                        title={permissionStatus === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN ? 'Settings' : 'Allow'} 
                        onPress={requestPermission} 
                    />

                    <Button 
                        title="Deny" 
                        onPress={onDeny} 
                        variant="outlined" color="text" 
                    /> */}
                </View>
            </View>
        </CenterModal>
    )
}