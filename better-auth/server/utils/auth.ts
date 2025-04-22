import { betterAuth } from "better-auth";
import pkg from 'pg'

const { Pool } = pkg
// const dialect = new LibsqlDialect({
//   url: process.env.BETTER_AUTH_URL || "",
//   authToken: process.env.BETTER_AUTH_SECRET || "",
// })
export const auth = betterAuth({
  database: new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5432"),
  }),
  emailAndPassword: {  
    enabled: true
  },
  socialProviders: { 
    github: { 
      clientId: process.env.GITHUB_CLIENT_ID as string, 
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
    }, 
  }, 
})


//  npx @better-auth/cli generate --config server/utils/auth.ts