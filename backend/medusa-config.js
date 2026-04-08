import { Modules } from "@medusajs/framework/utils"

/** @type {import('@medusajs/framework/types').MedusaConfig} */
export default {
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS || "http://localhost:5173",
      adminCors: process.env.ADMIN_CORS || "http://localhost:5173",
      authCors: "*",
      jwtSecret: process.env.JWT_SECRET || "super-secret-jwt-token",
      cookieSecret: process.env.COOKIE_SECRET || "super-secret-cookie-token",
    },
  },
  modules: {
    [Modules.API_KEY]: true,
    [Modules.AUTH]: {
      providers: [
        {
          resolve: "@medusajs/auth-emailpass",
          id: "emailpass",
          options: {},
        },
      ],
    },
    [Modules.CART]: true,
    [Modules.CURRENCY]: true,
    [Modules.CUSTOMER]: true,
    [Modules.FULFILLMENT]: true,
    [Modules.INVENTORY]: true,
    [Modules.ORDER]: true,
    [Modules.PAYMENT]: true,
    [Modules.PRICING]: true,
    [Modules.PRODUCT]: true,
    [Modules.PROMOTION]: true,
    [Modules.REGION]: true,
    [Modules.SALES_CHANNEL]: true,
    [Modules.STOCK_LOCATION]: true,
    [Modules.TAX]: true,
    [Modules.USER]: {
      options: {
        jwt_secret: process.env.JWT_SECRET || "super-secret-jwt-token",
      },
    },
    [Modules.WORKFLOW_ENGINE]: true,
  },
}