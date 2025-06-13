import MySessionProvider from "@/components/MySessionProvider";
import StoreProvider from "@/components/StoreProvider";
import type { Metadata } from "next";
import { Session } from "next-auth";
import { Roboto } from "next/font/google";
import "./globals.css";
// import "leaflet/dist/leaflet.css"
import { LoadingProvider } from "@/components/LoadingProvider";
import GlobalLoading from "@/components/GlobalLoading";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700", "900"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "NextJS Tailwind Blog Posts Page",
    description: "hello",
};

export default function RootLayout({ children, session }: { children: React.ReactNode; session: Session }) {
    return (
        <MySessionProvider session={session}>
            <StoreProvider>
                <html lang="en">
                    <body className={roboto.className}>
                        <LoadingProvider>
                            <GlobalLoading />
                            {children}
                        </LoadingProvider>
                    </body>
                </html>
            </StoreProvider>
        </MySessionProvider>
    );
}
