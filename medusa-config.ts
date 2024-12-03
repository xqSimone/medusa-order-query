import { loadEnv, defineConfig } from "@medusajs/framework/utils";
import { cleanEnv,  str } from "envalid";

loadEnv(process.env.NODE_ENV || "development", process.cwd());

const config = cleanEnv(process.env, {
  DATABASE_URL: str(),
  REDIS_URL: str(),
  MEDUSA_BACKEND_URL: str(),
  STORE_CORS: str(),
  ADMIN_CORS: str(),
  AUTH_CORS: str(),
  JWT_SECRET: str(),
  COOKIE_SECRET: str(),
});



module.exports = defineConfig({
  admin: {
    backendUrl: config.MEDUSA_BACKEND_URL,
  },
  projectConfig: {
    databaseUrl: config.DATABASE_URL,
    redisUrl: config.REDIS_URL,
    http: {
      storeCors: config.STORE_CORS,
      adminCors: config.ADMIN_CORS,
      authCors: config.AUTH_CORS,
      jwtSecret: config.JWT_SECRET,
      cookieSecret: config.COOKIE_SECRET,
    },
  },
  modules: [
  ],
});
