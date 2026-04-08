// GET /store/inventory - List all inventory items (public)
export const GET = async (req, res) => {
  const query = req.scope.resolve("query")

  const { data: products } = await query.graph({
    entity: "product",
    fields: ["id", "title", "description", "thumbnail", "metadata"],
  })

  res.json({ inventory_items: products })
}
