"use client";
import { AppStore, makeStore } from "@/store";
import { loadUserAction } from "@/store/slices/auth-slice";
import { useSession } from "next-auth/react";
import { useRef } from "react";
import { Provider } from "react-redux";
// import { makeStore, AppStore }

export default function StoreProvider({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<AppStore>(undefined);
    const session = useSession()

    if (!storeRef.current) {
        // loadUserAction()
        // Create the store instance the first time this renders
        storeRef.current = makeStore();
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
}
