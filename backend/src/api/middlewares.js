import { defineMiddlewares, authenticate } from "@medusajs/medusa"

export default defineMiddlewares({
  routes: [
   
    {
      matcher: "/store/inventory*",
      method: ["GET"],
      middlewares: [
        authenticate("customer", ["bearer", "session"], {
          allowUnauthenticated: true,
        }),
      ],
    },
   
    {
      matcher: "/custom/inventory*",
      method: ["GET", "POST", "PUT", "DELETE"],
      middlewares: [
        authenticate("user", ["bearer", "session", "api-key"], {
          allowUnauthenticated: true,
        }),
      ],
    },
  ],
})
