import StoreProvider from "@/components/StoreProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700", "900"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "NextJS Tailwind Blog Posts Page",
    description:
        "Download Tailwind Blog Post Page, a free webpage template developed by Creative Tim. Based on Tailwind CSS and Material Tailwind, see the live demo on our site and elevate your blogging experience!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
                    integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                />
                <link rel="stylesheet" href="css/index.css" />
                {/* <link rel="shortcut icon" href="/favicon.png" type="image/png" /> */}
                <script
                    src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.0.5/swiper-bundle.min.js"
                    integrity="sha512-Ysw1DcK1P+uYLqprEAzNQJP+J4hTx4t/3X2nbVwszao8wD+9afLjBQYjz7Uk4ADP+Er++mJoScI42ueGtQOzEA=="
                ></script>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.0.5/swiper-bundle.min.css"
                    integrity="sha512-rd0qOHVMOcez6pLWPVFIv7EfSdGKLt+eafXh4RO/12Fgr41hDQxfGvoi1Vy55QIVcQEujUE1LQrATCLl2Fs+ag=="
                />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.3/font/bootstrap-icons.min.css"
                    integrity="sha512-dPXYcDub/aeb08c63jRq/k6GaKccl256JQy/AnOq7CAnEZ9FzSL9wSbcZkMp4R26vBsMLFYH4kQ67/bbV8XaCQ=="
                />
                <script src="/js/index.js"></script>
            </head>
            <body className={roboto.className}>
                <StoreProvider>{children}</StoreProvider>
            </body>
        </html>
    );
}
