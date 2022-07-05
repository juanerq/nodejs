import Services from '../services/Services.js'
import to from '../helpers/to.js'
import { modelList } from '../models/index.js'
import * as response from '../response/response.js'
const services = new Services()

export const listCategories = async (req, res, next) => {
  const id = req.params?.id
  const { limit, from } = req.query

  const [error, result] = await to(
    !id
      ? services.find(modelList.category, { limit, from }, false)
      : services.findOne(modelList.category, id)
  )
  if (error) return next(error)

  response.success(res, result.length, result)
}

export const createCategory = async (req, res, next) => {
  const { name, userId } = req.body
  const [error, result] = await to(services.create(modelList.category, { name, userId }))
  if (error) return next(error)

  response.success(res, 'Category created', result)
}

export const updateCategory = async (req, res, next) => {
  const id = req.params.id
  const { name } = req.body

  const [error, result] = await to(services.update(modelList.category, id, { name }))
  if (error) return next(error)

  response.success(res, 'Category updated', result)
}

export const deleteCategory = async (req, res, next) => {
  const id = req.params.id

  const [error, result] = await to(services.delete(modelList.category, id))
  if (error) return next(error)

  response.success(res, 'Category deleted', result)
}
