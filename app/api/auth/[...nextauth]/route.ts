import NextAuth from "next-auth";
import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github'
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import {prisma} from "@/lib/prisma";


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        })
    ],
    callbacks: {
        session: async ({ session, user }) => {
        if (session?.user) {
            session.user.id = user.id;
        }
            return session;
        },
    },
}

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};
