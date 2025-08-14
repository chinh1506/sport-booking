import { AuthOptions, getServerSession } from "next-auth";
import Keycloak from "next-auth/providers/keycloak";
import { JwtToken } from "@/interfaces/JwtToken";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const authOptions: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET!,
    providers: [
        Keycloak({
            clientId: "web-app",
            clientSecret: "",
            issuer: "http://localhost:8000/realms/myspringapp",
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        GoogleProvider({
            //   clientId: "146529723199-vfbr1tpk7pipcke390j7r7ap79j52g3k.apps.googleusercontent.com",
            clientId: process.env.GOOGLE_CLIENT_ID!,
            // clientSecret: "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",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],

    callbacks: {
        async jwt({ token, account, profile, user }) {
            // const cookie = await cookies();
            let newJwt: JwtToken = token;
            if (account && user) {
                newJwt = {
                    accessToken: account.access_token,
                    expiresAt: account.expires_at,
                    refreshToken: account.refresh_token,
                    refreshExpiresIn: account.refresh_expires_in,
                    provider: account.provider,
                    scope: account.scope,
                    email: token.email,
                    tokenType: account.token_type,
                };

                return newJwt;
            }
            console.log(Date.now());
            newJwt.expiresAt && console.log(newJwt.expiresAt * 1000);

            if (newJwt.expiresAt && Date.now() < newJwt.expiresAt * 1000) {
                return newJwt;
            }
            return await refreshAccessToken(newJwt);
        },
        session({ session, token }) {
            session = { ...session, ...token };

            return session;
        },
    },
};

async function refreshAccessToken(token: JwtToken): Promise<JwtToken> {
    try {
        const response = await fetch("http://localhost:8080/auth/refresh-token", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                clientId: "web-app",
                refreshToken: token.refreshToken || "",
            }),
        });
        const refreshedTokens = await response.json();

        if (!response.ok) {
            throw refreshedTokens;
        }

        return {
            ...token,
            accessToken: refreshedTokens.accessToken,
            expiresAt: Date.now() + refreshedTokens.expiresIn * 1000,
            refreshToken: refreshedTokens.refreshToken ?? token.refreshToken, // Fall back to old refresh token
            scope: refreshedTokens.scope,
            refreshExpiresIn: Date.now() + refreshedTokens.refreshExpiresIn * 1000,
        };
    } catch (error) {
        console.log(error);

        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
}
const getAuthSession = () => {
    return getServerSession(authOptions);
};

export { authOptions, getAuthSession };
