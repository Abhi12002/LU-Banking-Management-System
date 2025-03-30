import NextAuth, { NextAuthOptions, Session, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { dbConnect } from "../../../lib/dbConnect";
import { JWT } from "next-auth/jwt";

// Extend NextAuth's User and Session types
declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    dateOfBirth: string;
    ssn: string;
    bankAccounts?: {
      access_token: string;
      id: string;
      name:string;
      institution:{institution_id: string; name:string;};
      balance: number;
    }[];
    isAdmin: boolean;
  }

  interface Session {
    user: User;
  }
}

// Define the custom JWT type for your application
interface CustomJWT extends JWT {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
  bankAccounts?: {
    access_token: string;
    id: string;
    name:string;
    institution:{institution_id: string; name:string;};
    balance: number;
  }[];
  isAdmin: boolean,
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Invalid credentials provided");
        }

        const db = await dbConnect();
        const usersCollection = db.collection("users");

        const user = await usersCollection.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("User not found");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          address: user.address,
          city: user.city,
          state: user.state,
          country: user.country,
          postalCode: user.postalCode,
          dateOfBirth: user.dateOfBirth,
          ssn: user.ssn,
          bankAccounts: user.bank_accounts || [],
          isAdmin: user.isAdmin, // Store multiple bank accounts as an array
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 day session
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.address = user.address;
        token.city = user.city;
        token.state = user.state;
        token.country = user.country;
        token.postalCode = user.postalCode;
        token.dateOfBirth = user.dateOfBirth;
        token.ssn = user.ssn;
        token.bankAccounts = user.bankAccounts || [];
        token.isAdmin = user.isAdmin; // Store bank accounts as an array
      }
      return token as CustomJWT;
    },

    async session({ session, token }: any) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          firstName: token.firstName,
          lastName: token.lastName,
          address: token.address,
          city: token.city,
          state: token.state,
          country: token.country,
          postalCode: token.postalCode,
          dateOfBirth: token.dateOfBirth,
          ssn: token.ssn,
          bankAccounts: token.bankAccounts || [],
          isAdmin : token.isAdmin, // Ensure session user stores bank accounts as an array
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
    signOut: "/signup",
  },
};

export default NextAuth(authOptions);
