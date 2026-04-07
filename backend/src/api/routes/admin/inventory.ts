import { Router } from "express"
import { INVENTORY_MODULE } from "../../../modules/inventory"

const route = Router()

export default (app) => {
  app.use("/admin/inventory", route)

  // GET /admin/inventory - List all inventory items
  route.get("/", async (req, res) => {
    const inventoryService = req.scope.resolve(INVENTORY_MODULE)

    const items = await inventoryService.listInventoryItems()

    res.json({ inventory_items: items })
  })

  // GET /admin/inventory/:id - Get single inventory item
  route.get("/:id", async (req, res) => {
    const inventoryService = req.scope.resolve(INVENTORY_MODULE)
    const { id } = req.params

    try {
      const item = await inventoryService.retrieveInventoryItem(id)
      res.json({ inventory_item: item })
    } catch (error) {
      res.status(404).json({ message: "Inventory item not found" })
    }
  })

  // POST /admin/inventory - Create inventory item
  route.post("/", async (req, res) => {
    const inventoryService = req.scope.resolve(INVENTORY_MODULE)
    const { title, description, type, progress_status, builder_link, thumbnail, metadata } = req.body

    if (!title) {
      return res.status(400).json({ message: "Title is required" })
    }

    const item = await inventoryService.createInventoryItems({
      title,
      description,
      type: type || "3d_model",
      progress_status: progress_status || "not_started",
      builder_link,
      thumbnail,
      metadata,
    })

    res.status(201).json({ inventory_item: item })
  })

  // PUT /admin/inventory/:id - Update inventory item
  route.put("/:id", async (req, res) => {
    const inventoryService = req.scope.resolve(INVENTORY_MODULE)
    const { id } = req.params
    const { title, description, type, progress_status, builder_link, thumbnail, metadata } = req.body

    try {
      const item = await inventoryService.updateInventoryItems({
        id,
        title,
        description,
        type,
        progress_status,
        builder_link,
        thumbnail,
        metadata,
      })
      res.json({ inventory_item: item })
    } catch (error) {
      res.status(404).json({ message: "Inventory item not found" })
    }
  })

  // DELETE /admin/inventory/:id - Delete inventory item
  route.delete("/:id", async (req, res) => {
    const inventoryService = req.scope.resolve(INVENTORY_MODULE)
    const { id } = req.params

    try {
      await inventoryService.deleteInventoryItems(id)
      res.json({ id, deleted: true })
    } catch (error) {
      res.status(404).json({ message: "Inventory item not found" })
    }
  })
}
