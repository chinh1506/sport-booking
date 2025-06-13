import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "var(--color-primary)", // xanh da trời (sky-500)
                    light: "var(--color-primary-dark)", // sky-400
                    dark: "var(--color-primary-light)", // sky-600
                    background: "var(--color-primary-bg)", // sky-100
                },
            },
        },
    },
    plugins: [],
} satisfies Config;
