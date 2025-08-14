import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
// import "leaflet/dist/leaflet.css"
import { LoadingProvider } from "@/components/LoadingProvider";
import GlobalLoading from "@/components/GlobalLoading";
import { getAuthSession } from "./api/auth/[...nextauth]/auth";
import Providers from "@/components/Providers";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700", "900"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Booking App",
    description: "hello",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await getAuthSession();

    return (
        <html lang="en">
            <body className={roboto.className}>
                <Providers session={session}>
                    <GlobalLoading />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
