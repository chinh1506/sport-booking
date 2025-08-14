"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { LoadingProvider } from "../LoadingProvider";
import StoreProvider from "../StoreProvider";

export default function Providers({ session, children }: { session: Session | null; children: React.ReactNode }) {
    return (
        <SessionProvider session={session}>
            <StoreProvider>
                <LoadingProvider>{children}</LoadingProvider>
            </StoreProvider>
        </SessionProvider>
    );
}
