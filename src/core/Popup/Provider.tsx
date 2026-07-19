import { createContext, ReactNode, useContext, useState } from "react";
import { IconName } from "@core";
import { GestureResponderEvent, ViewStyle } from "react-native";
import { ButtonProps } from "@components";
import { randomUUID } from "@shared/utils/common";
import { Popup } from "./Popup";


type Actions = Array<Omit<ButtonProps, 'onPress'> & {
    onPress: (event: GestureResponderEvent, options: Parameters<NonNullable<ButtonProps['onPress']>>['1'] & {hide: () => void;}) => void;
}>;

export type POPUP = {
    title: string;
    actions: Actions;
    icon?: IconName | (() => ReactNode);
    subtitle?: string;
    styles?: Partial<Record<'dialog' | 'content' | 'title' | 'subtitle' | 'footer', ViewStyle>>;
    closeAfterAction?: boolean;
}

export type ALERT_INFO = Omit<POPUP, 'actions' | 'closeAfterAction'> & {
    action?: Omit<Actions[0], 'color'>;
};

export type CONFIRM_INFO = Omit<POPUP, 'actions' | 'closeAfterAction'> & {
    onConfirm: Actions[0]['onPress'];
    confirm?: Omit<Actions[0], 'color' | 'onPress'>;
    cancel?: Omit<Actions[0], 'color' | 'onPress'>;
    onCancel?: Actions[0]['onPress'];
};

export type INFO_TYPE = 'success' | 'error' | 'warning' | 'info' | 'default';



const Context = createContext<null | {
    popups: Array<POPUP & {
        id: string;
        visible: boolean;
    }>;
    showPopup: (info: POPUP) => void;
    hidePopup: (id: string) => void;
    Alert: Record<INFO_TYPE, (info: ALERT_INFO) => void>;
    Confirm: Record<INFO_TYPE, (info: CONFIRM_INFO) => void>;
    cleanupPopups: () => void;
}>(null);


export const popupServiceRef = {
    current: null as null | {
        showAlert: (type: INFO_TYPE, info: ALERT_INFO) => void;
        showConfirm: (type: INFO_TYPE, info: CONFIRM_INFO) => void;
        showPopup: (info: POPUP) => void;
    }
}


export function PopupProvider({ children }: {children: ReactNode}) {
    const [popups, setPopups] = useState<Array<POPUP & {
        id: string;
        visible: boolean;
    }>>([]);

    
    function showPopup(info: POPUP) {
        setPopups(prev => [...prev, {
            id: randomUUID(),
            visible: true,
            ...info,
            closeAfterAction: info.closeAfterAction ?? true,
        }]);
    }

    function hidePopup(id: string) {
        setPopups(prev => prev.map(popup => {
            if(popup.id !== id) return popup;
            return {
                ...popup,
                visible: false
            }
        }));
    }

    function showAlert(type: INFO_TYPE, info: ALERT_INFO) {
        showPopup({
            ...info,
            closeAfterAction: true,
            actions: [{
                title: info.action?.title ?? 'OK',
                variant: info.action?.variant ?? 'solid',
                color: type === 'default' ? 'text' : type,
                rounded: info.action?.rounded ?? 100,
                style: {...info.action?.style, flex: 1},
                onPress: info.action?.onPress ?? ((_, {hide}) => hide())
            }]
        })
    }

    function showConfirm(type: INFO_TYPE, info: CONFIRM_INFO) {
        showPopup({
            ...info,
            closeAfterAction: true,
            actions: [
                {
                    ...info.cancel,
                    title: info.cancel?.title ?? 'Cancel',
                    variant: info.cancel?.variant ?? 'outlined',
                    color: 'text',
                    rounded: info.cancel?.rounded ?? 100,
                    style: {...info.cancel?.style, flex: 1},
                    onPress: info?.onCancel ?? ((_, {hide}) => hide()),
                },
                {
                    ...info.confirm,
                    title: info.confirm?.title ?? 'Confirm',
                    variant: info.confirm?.variant ?? 'solid',
                    color: type === 'default' ? 'text' : type,
                    rounded: info.confirm?.rounded ?? 100,
                    style: {...info.confirm?.style, flex: 1},
                    onPress: info.onConfirm ?? ((_, {hide}) => hide()),
                }
            ]
        })
    }

    popupServiceRef.current = { showAlert, showConfirm, showPopup };

    const Alert = {
        success: (info: ALERT_INFO) => showAlert('success', info),
        error: (info: ALERT_INFO) => showAlert('error', info),
        warning: (info: ALERT_INFO) => showAlert('warning', info),
        info: (info: ALERT_INFO) => showAlert('info', info),
        default: (info: ALERT_INFO) => showAlert('default', info)
    }

    const Confirm = {
        success: (info: CONFIRM_INFO) => showConfirm('success', info),
        error: (info: CONFIRM_INFO) => showConfirm('error', info),
        warning: (info: CONFIRM_INFO) => showConfirm('warning', info),
        info: (info: CONFIRM_INFO) => showConfirm('info', info),
        default: (info: CONFIRM_INFO) => showConfirm('default', info)
    }

    function cleanupPopups() {
        setPopups(prev => prev.filter(popup => popup.visible));
    }

    const states = {
        popups,
        showPopup,
        hidePopup,
        cleanupPopups,
        Alert,
        Confirm
    }
    
    return (
        <Context.Provider value={states}>
            {children}

            {
                popups.map(popup => (
                    <Popup key={popup.id} id={popup.id} />
                ))
            }
        </Context.Provider>
    )
}


export function usePopupContext() {
    const context = useContext(Context);
    if(!context) throw new Error('usePopupContext must be used within a PopupProvider');
    return context;
}

export function usePopup() {
    const {Alert, Confirm, cleanupPopups, showPopup} = usePopupContext()
    return {
        Alert,
        Confirm,
        cleanupPopups,
        showPopup
    }
}