import { PopupProvider } from "@core";

export default function FuntoolsNativeUIProvider({ children }: { children: React.ReactNode }) {
    return (
        <PopupProvider>
            {children}
        </PopupProvider>
    )
}