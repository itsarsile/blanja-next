import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions: AuthOptions = {
    pages: {
      signIn: "/login",
    },
    providers: [
      CredentialsProvider({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: "Credentials",
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          email: { label: "Email", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          // You need to provide your own logic here that takes the credentials
          // submitted and returns either a object representing a user or value
          // that is false/null if the credentials are invalid.
          // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
          // You can also use the `req` object to obtain additional parameters
          // (i.e., the request IP address)
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login/api`, {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          });

          const user = await res.json();
  
          // If no error and we have user data, return it
          if (res.ok && user) {
            return user;
          }
          // Return null if user data could not be retrieved
          return null;
        },
      }),
    ],
    session: {
      strategy: "jwt",
    },
    callbacks: {
      async redirect({url, baseUrl}) {
        if (url.startsWith("/")) return `${baseUrl}${url}`
        else if (new URL(url).origin === baseUrl) return url
        return baseUrl
      },
      async jwt({ token, user, account }) {
        if (user) {
          const u = user as unknown as any;
          return {
            ...token,
            id: u.userWithoutPassword.id,
            role: u.userWithoutPassword.role,
            name: u.userWithoutPassword.name,
            verified: u.userWithoutPassword.verified
          };
        }
        return token;
      },
      async session({ session, token, user }) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            role: token.role,
            name: token.name,
            verfiied: token.verified,
          },
        };
      },
    },
  }


const handler = NextAuth(authOptions);



export { handler as GET, handler as POST };
