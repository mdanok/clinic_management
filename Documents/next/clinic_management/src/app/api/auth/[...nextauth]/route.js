import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { encode, decode } from "next-auth/jwt";
import { getServerSession } from "next-auth/next";
import prisma from "../../prismaClient";
import bcrypt from "bcrypt";
export const authOptions = {
  session: {
    strategy: "jwt",
  },
  jwt: { encode, decode },
  providers: [
    CredentialsProvider({
      name: "credentials",
      type: "credentials",
      async authorize(credentials) {
        const credentialDetails = {
          email: credentials.email,
          password: credentials.password,
        };
        const user = await prisma.doctor.findFirst({
          where: {
            email: credentialDetails.email,
          },
        });
        if (!user) throw new Error("The Account does not exist.");
        if (user.activated === false)
          throw new Error("Please verify your email before signing in.");

        const isPasswordValid = await bcrypt.compare(
          credentialDetails.password,
          user.hashedPassword
        );

        if (isPasswordValid) {
          return user;
        } else {
          throw new Error("Incorrect password.");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      return session;
    },
  },
};

export const handler = NextAuth(authOptions);
export const getNextAuthSession = async () =>
  await getServerSession(authOptions);
export { handler as GET, handler as POST };
