import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
    providers: [
        CredentialsProvider({
            async authorize(credentials, req) {
                let user = null; //todo
                return user;
            }
        })
    ],
    secret: 'sekm5r(36becrblb#4jpfvo&@uy8ys3jz)2xp*ikfr$9x9klpwi&o=',
    jwt: {
        signingKey: { "kty": "oct", "kid": "--", "alg": "HS256", "k": "--" },
        verificationOptions: {
            algorithms: ["HS256"]
        }
    },
    session: {
        maxAge: 1 * 24 * 60 * 60
    },
    callbacks: {
        async session({ session, token, user }) {
            session.apiToken = token.apiToken; //guarda token na sessão para usar durante a navegação.
            return session
        },
        async jwt({ user, token, account, profile }) {
            if (user !== undefined)
                token.apiToken = user.accessToken;

            return token;
        }
    }
}
export default NextAuth(authOptions)