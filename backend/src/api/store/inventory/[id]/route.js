// GET /store/inventory/:id - Get single inventory item (public)
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
