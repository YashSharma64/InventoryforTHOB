import { Router } from "express"
import { INVENTORY_MODULE } from "../../../modules/inventory"

const route = Router()

export default (app) => {
  app.use("/store/inventory", route)

  // GET /store/inventory - List all inventory items (public)
  route.get("/", async (req, res) => {
    const inventoryService = req.scope.resolve(INVENTORY_MODULE)

    const items = await inventoryService.listInventoryItems()

    res.json({ inventory_items: items })
  })

  // GET /store/inventory/:id - Get single inventory item (public)
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
}
