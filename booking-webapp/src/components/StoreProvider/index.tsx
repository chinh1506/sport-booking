"use client";
import { AppStore, makeStore } from "@/store";
import { loadUserAction } from "@/store/slices/auth-slice";
import { SessionContextValue, signOut, useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { JwtToken } from "@/interfaces/JwtToken";
import { Session } from "next-auth";
import { setCookie } from "cookies-next";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<AppStore>(undefined);
    // const session:CustomSession= useSession();
    const { data, status } = useSession();
    const jwtToken: JwtToken = { ...data };
    console.log(jwtToken);
    if (!storeRef.current) {
        // loadUserAction()
        // Create the store instance the first time this renders
        storeRef.current = makeStore();
        // console.log("Make store");
    }
    useEffect(() => {
        if (status == "authenticated") {
            if (jwtToken.error) {
                signOut();
            } else {
                setCookie("tokens", JSON.stringify(jwtToken));
                storeRef.current?.dispatch(
                    loadUserAction({
                        ...data,
                    })
                );
            }
        }
    }, [status]);

    return <Provider store={storeRef.current}>{children}</Provider>;
}
