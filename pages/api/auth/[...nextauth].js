import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/server/models/User';
import dbConnect from '@/server/config/dbConnect';
import bcrypt from 'bcryptjs';

export default async function auth(req, res) {
  return await NextAuth(req, res, {
    session: {
      strategy: 'jwt',
    },
    providers: [
      CredentialsProvider({
        // credentials are the email and password coming from the front end
        async authorize(credentials, req) {
          dbConnect();

          const { email, password } = credentials;

          const user = await User.findOne({ email }).select('+password');

          if (!user) {
            throw new Error('Invalid email or password!');
          }

          const isPasswordMatch = await bcrypt.compare(password, user.password);

          if (!isPasswordMatch) {
            throw new Error('Invalid email or password!');
          }

          return user;
        },
      }),
    ],
    callbacks: {
      jwt: async ({ token, user }) => {
        user && (token.user = user);

        return token;
      },
      session: async ({ session, token }) => {
        session.user = token.user;

        // remove password from session
        delete session?.user?.password;

        return session;
      },
    },
    pages: {
      signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
  });
}
