import { MedusaService } from "@medusajs/framework/utils"
import InventoryItem from "../models/inventory-item"

// MedusaService auto-generates these methods:
// - createInventoryItems
// - updateInventoryItems
// - deleteInventoryItems
// - listInventoryItems
// - retrieveInventoryItem

class InventoryModuleService extends MedusaService({
  inventoryItem: InventoryItem,
}) {}

export default InventoryModuleService
