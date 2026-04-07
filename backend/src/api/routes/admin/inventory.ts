import { Router } from "express"

const route = Router()

export default (app) => {
  app.use("/admin/inventory", route)

  route.post("/", async (req, res) => {
    const productService = req.scope.resolve("productService")

    const { title, description } = req.body

    const product = await productService.create({
      title,
      description,
      metadata: {
        type: "3d_model",
        progress_status: "in_progress",
        builder_link: "",
      },
    })

    res.json({ product })
  })
}
