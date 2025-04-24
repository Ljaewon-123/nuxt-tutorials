import { betterAuth } from "better-auth";
import { magicLink, twoFactor } from "better-auth/plugins"
import pkg from 'pg'
import { getMagicLinkEmail } from "../templates/email";
import mjml2html from 'mjml'

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
  appName: 'better-auth-app',
  plugins: [
    // twoFactor()
    magicLink({
      sendMagicLink: async ({ email, token, url }, request) => {
        const { sendMail } = useNodeMailer()
        const { html } = mjml2html(getMagicLinkEmail(url))
        return sendMail({ subject: 'Nuxt + nodemailer', html: html, to: process.env.MAIL_USER })
      }
    })
  ],
  // secondaryStorage: {
	// 	get: async (key) => {
	// 		const value = await redis.get(key);
	// 		return value ? value : null;
	// 	},
	// 	set: async (key, value, ttl) => {
	// 		if (ttl) await redis.set(key, value, { EX: ttl });
	// 		// or for ioredis:
	// 		// if (ttl) await redis.set(key, value, 'EX', ttl)
	// 		else await redis.set(key, value);
	// 	},
	// 	delete: async (key) => {
	// 		await redis.del(key);
	// 	}
	// }
})


//  npx @better-auth/cli generate --config server/utils/auth.ts
