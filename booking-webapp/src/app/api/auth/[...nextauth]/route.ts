import NextAuth from "next-auth"
import Keycloak from "next-auth/providers/keycloak"

const handler = NextAuth({
  providers:[
    Keycloak({
        clientId:"web-app",
        clientSecret:"",
        issuer:"http://localhost:8000/realms/myspringapp"
    })
  ],
  callbacks:{
    jwt({ token, account, profile }){
        console.log("token");
        console.log(token);
        console.log(account);
        console.log(profile);
        
        
        return {
          ...token,
        ...account
        };
    },
    session({ session, token }) {
      // session.accessToken = token?.accessToken;
      // session.refreshToken = token?.refreshToken;
      session = {...session,...token};
      
      return session;
    },
  }
})

export { handler as GET, handler as POST }