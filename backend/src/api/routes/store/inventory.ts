import { Router } from "express"

const route = Router()

export default (app) => {
  app.use("/store/inventory", route)

  // GET /store/inventory - List all inventory items (public)
  route.get("/", async (req, res) => {
    const productService = req.scope.resolve("productService")

    const products = await productService.list()

    res.json({ inventory_items: products })
  })

  // GET /store/inventory/:id - Get single inventory item (public)
  route.get("/:id", async (req, res) => {
    const productService = req.scope.resolve("productService")
    const { id } = req.params

    try {
      const product = await productService.retrieve(id)
      res.json({ inventory_item: product })
    } catch (error) {
      res.status(404).json({ message: "Inventory item not found" })
    }
  })
}
