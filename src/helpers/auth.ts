import NextAuth from "next-auth"
import github from "next-auth/providers/github"
import { connect } from "./database"
import Users from "@/models/users"

declare module 'next-auth' {
    interface Session {
        accessToken?: string;
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        github({ authorization: { params: { scope: "read:user user:email repo" } } })
    ],
    callbacks: {
        async signIn({ user, profile }) {
            if (!profile) return false

            await connect()

            let existent = await Users.findOne({ email: user.email })

            if (!existent) {
                existent = await Users.create({
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    username: profile.login || user.email
                })
            }
            user.id = existent._id as string

            return true;
        },
        jwt({ token, user, account }) {
            if (user) token.id = user.id
            if (account) token.accessToken = account.access_token

            return token
        },
        session({ session, token }) {
            session.user.id = token.id as string
            session.accessToken = token.accessToken as string;
            return session
        },
        redirect({ url, baseUrl }) {
            return baseUrl + '/app'
        }
    }
})
