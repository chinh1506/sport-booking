"use client";
import { AppStore, makeStore } from "@/store";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { useRef } from "react";
import { Provider } from "react-redux";
// import { makeStore, AppStore }

export default function StoreProvider({ children, session }: { children: React.ReactNode; session: Session }) {
    const storeRef = useRef<AppStore>(undefined);
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore();
    }

    return (
        <SessionProvider session={session}>
            <Provider store={storeRef.current}>{children}</Provider>;
        </SessionProvider>
    );
}
