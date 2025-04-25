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

const storage = useStorage('data')

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
        // origin => to: email
        return sendMail({ subject: 'Nuxt + nodemailer', html: html, to: process.env.MAIL_USER })
      }
    })
  ],
  // 커스텀으로 kvstorage와 연결가능 
  // 이기능이 정의되지 않으면 연결된 databse에 저장함 세션을
  secondaryStorage: {
		get: async (key) => {
			const value = await storage.get(key) as string;
			return value ? value : null;
		},
		set: async (key, value, ttl) => {
      // get이 object로 return됨 약간 의문임... string를 충족하는데 왜 에러?
      // redis사용이 불가능하고 유저가 많지않다면 ttl때문에 DB에 넣는걸 권장함
      if (ttl) await storage.set(key, JSON.stringify(value));
      // if (ttl) await redis.set(key, value, { EX: ttl });
      // or for ioredis:
      // if (ttl) await redis.set(key, value, 'EX', ttl)
      else await storage.set(key, value);
		},
		delete: async (key) => {
			await storage.del(key);
		}
	}
})


//  npx @better-auth/cli generate --config server/utils/auth.ts
