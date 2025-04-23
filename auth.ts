import NextAuth from "next-auth"

import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs';
 

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
 
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) { 
        
        const user = await prisma.user.findUnique({
          where:{
            email: credentials?.email
          }})
          console.log( 'credentials ----' , credentials, user )
     
        const isValid = await bcrypt.compare(credentials.password, user.password)

        if (!isValid) {
          throw new Error("Invalid password.")
        }

        return user

      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Redirect based on role
         
        token.id = user?.id;
        token.phoneNumber = user?.phoneNumber;
        token.email = user?.email;
        token.firstName = user?.firstName;
        token.lastName = user?.lastName;
        token.role = user?.role;
      
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token?.id;
        session.user.phoneNumber = token?.phoneNumber;
        session.user.displayName = token?.displayName;
        session.user.photoURL = token?.photoURL;
        session.user.email = token.email;
        session.user.role = token.role; 
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
})