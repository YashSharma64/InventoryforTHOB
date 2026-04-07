import { Module, Modules } from "@medusajs/framework/utils"
import InventoryModuleService from "./services/inventory-service"

export const INVENTORY_MODULE = "inventory"

const InventoryModule = Module(INVENTORY_MODULE, {
  service: InventoryModuleService,
})

export default InventoryModule
