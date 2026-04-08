// GET /admin/inventory/:id - Get single inventory item
export const GET = async (req, res) => {
  const query = req.scope.resolve("query")
  const { id } = req.params

  try {
    const { data: products } = await query.graph({
      entity: "product",
      filters: { id },
      fields: ["id", "title", "description", "thumbnail", "metadata"],
    })

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "Inventory item not found" })
    }

    res.json({ inventory_item: products[0] })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// PUT /admin/inventory/:id - Update inventory item
export const PUT = async (req, res) => {
  const productModuleService = req.scope.resolve("product")
  const { id } = req.params
  const { title, description, type, progress_status, builder_link, thumbnail } = req.body

  try {
    const updateData = {}
    if (title) updateData.title = title
    if (description) updateData.description = description
    if (thumbnail) updateData.thumbnail = thumbnail
    if (type || progress_status || builder_link) {
      updateData.metadata = {
        type,
        progress_status,
        builder_link,
      }
    }

    const product = await productModuleService.updateProducts(id, updateData)
    res.json({ inventory_item: product })
  } catch (error) {
    res.status(404).json({ message: "Inventory item update failed", detail: error.message })
  }
}

// DELETE /admin/inventory/:id - Delete inventory item
export const DELETE = async (req, res) => {
  const productModuleService = req.scope.resolve("product")
  const { id } = req.params

  try {
    await productModuleService.deleteProducts([id])
    res.json({ id, deleted: true })
  } catch (error) {
    res.status(404).json({ message: "Inventory item could not be deleted", detail: error.message })
  }
}
