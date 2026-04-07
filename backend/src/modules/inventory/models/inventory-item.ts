import { model } from "@medusajs/framework/utils"

const InventoryItem = model.define("inventory_item", {
  id: model.id().primaryKey(),
  title: model.text().index(),
  description: model.text().nullable(),
  type: model.text().default("3d_model"),
  progress_status: model.text().default("not_started"),
  builder_link: model.text().nullable(),
  thumbnail: model.text().nullable(),
  metadata: model.json().nullable(),
})

export default InventoryItem
