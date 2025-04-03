import NextAuth from "next-auth";
import Keycloak from "next-auth/providers/keycloak";
import { cookies } from "next/headers";
import { URLSearchParams } from "node:url";
import { JwtToken } from "@/interfaces/JwtToken";
const handler = NextAuth({
    providers: [
        Keycloak({
            clientId: "web-app",
            clientSecret: "",
            issuer: "http://localhost:8000/realms/myspringapp",
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile, user }) {
            const cookie = await cookies();
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

            
            if (newJwt.expiresAt && Date.now() >= newJwt.expiresAt) {
                return newJwt;
            }
            return await refreshAccessToken(newJwt);
        },
        session({ session, token }) {
             session = { ...session, ...token };

            return session;
        },
    },
});
async function refreshAccessToken(token: JwtToken): Promise<JwtToken> {
    try {
        const response = await fetch("http://localhost:8080/auth/refresh-token", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            // body: new URLSearchParams({
            //     clientId: "web-app",
            //     refreshToken: token.refreshToken || "",
            // }),
            body: JSON.stringify({
                clientId: "web-app",
                refreshToken: token.refreshToken || "",
            }),
        });
        console.log("response");
        console.log(response);

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

export { handler as GET, handler as POST };
