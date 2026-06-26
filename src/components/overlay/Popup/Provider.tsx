import { ColorState } from "@theme";
import { createContext, ReactNode, useContext, useState } from "react";
import { IconName } from "@core";
import { ViewStyle } from "react-native";
import { ButtonProp } from "../../form";
import { randomUUID } from "@shared/utils/common";
import { Popup } from "./Popup";


type Actions = Array<Pick<ButtonProp, 'title'| 'variant' | 'color' | 'rounded' | 'loading' | 'style'> & {
    onPress: ({hide, setLoading}: {hide: () => void; setLoading: (loading: boolean) => void}) => void;
}>;

type POPUP = {
    title: string;
    actions: Actions;
    icon?: IconName | (() => ReactNode);
    subtitle?: string;
    styles?: Record<'dialog' | 'title' | 'subtitle' | 'footer', ViewStyle>;
}

type ALERT = Omit<POPUP, 'actions'> & {
    action?: Omit<Actions[0], 'color'>;
};

type CONFIRM = Omit<POPUP, 'actions'> & {
    onConfirm: Omit<Actions[0], 'color'>;
    onCancel?: Omit<Actions[0], 'color'>;
};

type INFO_TYPE = 'success' | 'error' | 'warning' | 'info' | 'default';

const Context = createContext<null | {
    popups: Array<POPUP & {
        id: string;
        visible: boolean;
    }>;
    showPopup: (info: POPUP) => void;
    hidePopup: (id: string) => void;
    Alert: Record<INFO_TYPE, (info: ALERT) => void>;
    Confirm: Record<INFO_TYPE, (info: CONFIRM) => void>;
    updateLoading: (id: string, index: number, loading: boolean) => void;
    cleanupPopups: () => void;
}>(null);

export function PopupProvider({ children }: {children: ReactNode}) {
    const [popups, setPopups] = useState<Array<POPUP & {
        id: string;
        visible: boolean;
    }>>([]);

    
    function showPopup(info: POPUP) {
        setPopups(prev => [...prev, {
            id: randomUUID(),
            visible: true,
            ...info
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

    function updateLoading(id: string, index: number, loading: boolean) {
        setPopups(prev => prev.map(popup => {
            if(popup.id !== id) return popup;
            return {
                ...popup,
                actions: popup.actions.map((action, i) => {
                    if(i !== index) return action;
                    return {
                        ...action,
                        loading
                    }
                })
            }
        }));
    }

    function showAlert(type: INFO_TYPE, info: ALERT) {
        showPopup({
            ...info,
            actions: [{
                title: info.action?.title ?? 'OK',
                variant: info.action?.variant ?? 'solid',
                color: type === 'default' ? 'text' : type,
                rounded: info.action?.rounded ?? 100,
                style: {...info.action?.style, flex: 1},
                onPress: info.action?.onPress ?? (({hide}) => hide())
            }]
        })
    }

    function showConfirm(type: INFO_TYPE, info: CONFIRM) {
        showPopup({
            ...info,
            actions: [
                {
                    title: info.onCancel?.title ?? 'Cancel',
                    variant: info.onCancel?.variant ?? 'outlined',
                    color: 'text',
                    rounded: info.onCancel?.rounded ?? 100,
                    style: {...info.onCancel?.style, flex: 1},
                    onPress: info.onCancel?.onPress ?? (({hide}) => hide())
                },
                {
                    title: info.onConfirm.title ?? 'Confirm',
                    variant: info.onConfirm.variant ?? 'solid',
                    color: type === 'default' ? 'text' : type,
                    rounded: info.onConfirm.rounded ?? 100,
                    style: {...info.onConfirm.style, flex: 1},
                    onPress: info.onConfirm.onPress
                }
            ]
        })
    }

    const Alert = {
        success: (info: ALERT) => showAlert('success', info),
        error: (info: ALERT) => showAlert('error', info),
        warning: (info: ALERT) => showAlert('warning', info),
        info: (info: ALERT) => showAlert('info', info),
        default: (info: ALERT) => showAlert('default', info)
    }

    const Confirm = {
        success: (info: CONFIRM) => showConfirm('success', info),
        error: (info: CONFIRM) => showConfirm('error', info),
        warning: (info: CONFIRM) => showConfirm('warning', info),
        info: (info: CONFIRM) => showConfirm('info', info),
        default: (info: CONFIRM) => showConfirm('default', info)
    }

    function cleanupPopups() {
        setPopups(prev => prev.filter(popup => popup.visible));
    }

    const states = {
        popups,
        showPopup,
        hidePopup,
        updateLoading,
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