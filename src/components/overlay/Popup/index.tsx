import { ColorState } from "@theme";
import { createContext, ReactNode, useContext, useState } from "react";
import { IconName } from "@core";
import { ViewStyle } from "react-native";
import { ButtonProp } from "../../form";
import { randomUUID } from "@shared/utils/common";
import { Popup } from "./Popup";


type Actions = Array<Pick<ButtonProp, 'title'| 'variant' | 'color' | 'rounded' | 'loading'> & {
    onPress: ({hide, setLoading}: {hide: () => void; setLoading: (loading: boolean) => void}) => void;
}>;

type POPUP = {
    title: string;
    actions: Actions;
    icon?: IconName | (() => ReactNode);
    subtitle?: string;
    color?: ColorState;
    styles?: Record<'dialog' | 'title' | 'subtitle' | 'footer', ViewStyle>;
}

const Context = createContext<null | {
    popups: Array<POPUP & {
        id: string;
        visible: boolean;
    }>;
    showPopup: (info: POPUP) => void;
    hidePopup: (id: string) => void;
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

    function cleanupPopups() {
        setPopups(prev => prev.filter(popup => popup.visible));
    }

    const states = {
        popups,
        showPopup,
        hidePopup,
        updateLoading,
        cleanupPopups
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