"use client"

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React from "react";

function MySessionProvider({ children, session }: { session: Session; children: React.ReactNode }) {
    return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default MySessionProvider;
