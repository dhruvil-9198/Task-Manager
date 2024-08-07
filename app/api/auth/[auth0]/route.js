// import NextAuth from "next-auth"
// import GithubProvider from "next-auth/providers/github"
// import GoogleProvider from 'next-auth/providers/google'


// export const authOptions = NextAuth({
//   // Configure one or more authentication providers
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET
//     }),
//     // ...add more providers here
//   ],

//   secret: process.env.NEXTAUTH_SECRET,
//   debug: true,
// })

// export {authOptions as GET, authOptions as POST};

import { handleAuth } from '@auth0/nextjs-auth0';

export const GET = handleAuth();