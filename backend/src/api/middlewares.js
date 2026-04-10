import { defineMiddlewares, authenticate } from "@medusajs/medusa"

const customCors = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173")
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization")
  
  if (req.method === "OPTIONS") {
    return res.sendStatus(200)
  }
  next()
}

export default defineMiddlewares({
  routes: [
   
    {
      matcher: "/store/inventory*",
      method: ["GET", "OPTIONS"],
      middlewares: [
        customCors,
        authenticate("customer", ["bearer", "session"], {
          allowUnauthenticated: true,
        }),
      ],
    },
   
    {
      matcher: "/custom/inventory*",
      method: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      middlewares: [
        customCors,
        authenticate("user", ["bearer", "session", "api-key"], {
          allowUnauthenticated: true,
        }),
      ],
    },
  ],
})
