// GET /admin/inventory - List all inventory items
export const GET = async (req, res) => {
  const query = req.scope.resolve("query")
  
  const take = parseInt(req.query.take, 10) || 20
  const skip = parseInt(req.query.skip, 10) || 0

  const { data: products } = await query.graph({
    entity: "product",
    fields: ["id", "title", "description", "thumbnail", "metadata"],
    pagination: { skip, take }
  })

  res.json({ inventory_items: products, count: products.length, skip, take })
}

// POST /admin/inventory - Create inventory item
export const POST = async (req, res) => {
  const productModuleService = req.scope.resolve("product")
  const { title, description, type, progress_status, builder_link, thumbnail } = req.body

  if (!title) {
    return res.status(400).json({ message: "Title is required" })
  }

  const [product] = await productModuleService.createProducts([
    {
      title,
      handle: `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`,
      description,
      thumbnail,
      options: [{ title: "Default", values: ["Default"] }],
      variants: [{
        title: "Default Variant",
        options: { "Default": "Default" },
        prices: [{ amount: 0, currency_code: "usd" }]
      }],
      metadata: {
        type: type || "3d_model",
        progress_status: progress_status || "not_started",
        builder_link: builder_link || "",
      },
    }
  ])

  res.status(201).json({ inventory_item: product })
}
