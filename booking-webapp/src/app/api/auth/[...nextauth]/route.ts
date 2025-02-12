import NextAuth from "next-auth";
import Keycloak from "next-auth/providers/keycloak";
import { cookies } from "next/headers";
import { URLSearchParams } from "node:url";

const handler = NextAuth({
  providers: [
    Keycloak({
      clientId: "web-app",
      clientSecret: "",
      issuer: "http://localhost:8000/realms/myspringapp",
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      const cookie = await cookies();
      if (account && user) {
        return {
          ...token,
          ...account,
        };
      }

      console.log("token");
      console.log(token);
      console.log(account);
      console.log(profile);

      if (Date.now() < token?.expires_at) {
        return token;
      }
      return refreshAccessToken(token);
    },
    session({ session, token }) {
      // session.accessToken = token?.accessToken;
      // session.refreshToken = token?.refreshToken;
      session = { ...session, ...token };

      return session;
    },
  },
});
async function refreshAccessToken(token: any) {
  try {
    // const url =
    //   "http://localhost:8000/realms/myspringapp/protocol/openid-connect/token?" +
    //   new URLSearchParams({
    //     client_id: "web-app",
    //     // client_secret: process.env.GOOGLE_CLIENT_SECRET,
    //     grant_type: "refresh_token",
    //     refresh_token: token.refreshToken,
    //   });

    const response = await fetch("http://localhost:8000/realms/myspringapp/protocol/openid-connect/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      body: new URLSearchParams({
        client_id: "web-app",
        grant_type: "refresh_token",
        refresh_token: token.refresh_token,
      })
    });
    console.log("response");
    console.log(response);
    
    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
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
