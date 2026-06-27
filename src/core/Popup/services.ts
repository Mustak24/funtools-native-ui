import { ALERT_INFO, CONFIRM_INFO, INFO_TYPE, popupServiceRef } from "./Provider"


function executeServiceCall(type: 'alert' | 'confirm', method: INFO_TYPE, info: any) {
    if (!popupServiceRef.current) {
        throw new Error(`Popup service not initialized. Render <PopupProvider> first.`);
    }
    if (type === 'alert') {
        popupServiceRef.current.showAlert(method, info);
    } else {
        popupServiceRef.current.showConfirm(method, info);
    }
}

export const Alert = {
    success: (info: ALERT_INFO) => executeServiceCall('alert', 'success', info),
    error: (info: ALERT_INFO) => executeServiceCall('alert', 'error', info),
    warning: (info: ALERT_INFO) => executeServiceCall('alert', 'warning', info),
    info: (info: ALERT_INFO) => executeServiceCall('alert', 'info', info),
    default: (info: ALERT_INFO) => executeServiceCall('alert', 'default', info)
};

export const Confirm = {
    success: (info: CONFIRM_INFO) => executeServiceCall('confirm', 'success', info),
    error: (info: CONFIRM_INFO) => executeServiceCall('confirm', 'error', info),
    warning: (info: CONFIRM_INFO) => executeServiceCall('confirm', 'warning', info),
    info: (info: CONFIRM_INFO) => executeServiceCall('confirm', 'info', info),
    default: (info: CONFIRM_INFO) => executeServiceCall('confirm', 'default', info)
};