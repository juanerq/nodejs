import boom from '@hapi/boom'
import { Op } from 'sequelize'
import sequelize from '../database/sequelize.js'
const models = sequelize.models

class Services {
  async find (model, { limit = 100, from = 1, ...options } = {}, include = true) {
    if (!model || !models[model]) throw boom.badRequest('Model not found')

    const query = {
      offset: +from - 1,
      limit: +limit,
      where: {}
    }

    const { price, price_min, price_max } = options
    if (price_min) query.where.price = { [Op.gte]: price_min }
    if (price_max) query.where.price = { ...query.where.price, [Op.lte]: price_max }
    if (price) query.where.price = price

    const association = include ? models[model]?.namesAssociations ?? [] : []

    const { rows } = await models[model].findAndCountAll({
      ...query,
      include: association
    })
    return rows || []
  }

  async findOne (model, id) {
    if (!model || !models[model]) throw boom.badRequest('Model not found')

    const item = await models[model].findByPk(id, {
      include: models[model]?.namesAssociations ?? []
    })
    if (!item) throw boom.notFound(`${model} not found`)

    return item
  }

  async findOneWhere (model, where, include = false) {
    if (!model || !models[model]) throw boom.badRequest('Model not found')

    const association = include ? models[model]?.namesAssociations ?? [] : []

    const item = await models[model].findAll({
      where,
      include: association
    })
    if (!item || item.length === 0) throw boom.notFound(`${model} not found`)

    return item
  }

  async create (model, data) {
    if (!model || !models[model]) throw boom.badRequest('Model not found')
    const item = await models[model].create(data)

    return item || {}
  }

  async update (model, id, data) {
    if (!model || !models[model]) throw boom.badRequest('Model not found')

    const item = await this.findOne(model, id)

    await item.update(data)

    return item || {}
  }

  async updateWhere (model, where, data) {
    if (!model || !models[model]) throw boom.badRequest('Model not found')

    const item = await this.findOneWhere(model, where)

    await item[0].update(data)

    return item || {}
  }

  async delete (model, id) {
    if (!model || !models[model]) throw boom.badRequest('Model not found')

    const item = await this.findOne(model, id)

    await item.destroy()

    return item || {}
  }

  async deleteWhere (model, where) {
    if (!model || !models[model]) throw boom.badRequest('Model not found')

    const item = await this.findOneWhere(model, where)

    await item[0].destroy()

    return item || {}
  }
}

export default Services
