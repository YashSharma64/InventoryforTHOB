import { Router } from "express"

const route = Router()

export default (app) => {
  app.use("/admin/inventory", route)

  // GET /admin/inventory - List all inventory items
  route.get("/", async (req, res) => {
    const productService = req.scope.resolve("productService")

    const products = await productService.list()

    res.json({ inventory_items: products })
  })

  // GET /admin/inventory/:id - Get single inventory item
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

  // POST /admin/inventory - Create inventory item
  route.post("/", async (req, res) => {
    const productService = req.scope.resolve("productService")
    const { title, description, type, progress_status, builder_link, thumbnail } = req.body

    if (!title) {
      return res.status(400).json({ message: "Title is required" })
    }

    const product = await productService.create({
      title,
      description,
      thumbnail,
      metadata: {
        type: type || "3d_model",
        progress_status: progress_status || "not_started",
        builder_link: builder_link || "",
      },
    })

    res.status(201).json({ inventory_item: product })
  })

  // PUT /admin/inventory/:id - Update inventory item
  route.put("/:id", async (req, res) => {
    const productService = req.scope.resolve("productService")
    const { id } = req.params
    const { title, description, type, progress_status, builder_link, thumbnail } = req.body

    try {
      const product = await productService.update(id, {
        title,
        description,
        thumbnail,
        metadata: {
          type,
          progress_status,
          builder_link,
        },
      })
      res.json({ inventory_item: product })
    } catch (error) {
      res.status(404).json({ message: "Inventory item not found" })
    }
  })

  // DELETE /admin/inventory/:id - Delete inventory item
  route.delete("/:id", async (req, res) => {
    const productService = req.scope.resolve("productService")
    const { id } = req.params

    try {
      await productService.delete(id)
      res.json({ id, deleted: true })
    } catch (error) {
      res.status(404).json({ message: "Inventory item not found" })
    }
  })
}
