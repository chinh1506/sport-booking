"use client";

import { Session } from "next-auth";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import Home from "./home/page";
import { ReactNode } from "react";

type Props = {
  session: Session;
  children: ReactNode;
};

export default function App({ session, children }: Props) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
