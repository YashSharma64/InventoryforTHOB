import { Router } from "express"

const route = Router()

export default (app) => {
  app.use("/store/inventory", route)

  route.get("/", async (req, res) => {
    const productService = req.scope.resolve("productService")

    const products = await productService.list()

    res.json({ inventory: products })
  })
}
