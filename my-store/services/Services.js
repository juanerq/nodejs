import boom from '@hapi/boom'
import sequelize from '../database/sequelize.js'
const models = sequelize.models

class Services {
  async find (model, { limit = 100, from = 1 } = {}) {
    if (!model || !models[model]) throw boom.badRequest('Model not found')

    const query = {
      offset: +from - 1,
      limit: +limit
    }

    const { rows } = await models[model].findAndCountAll(query)
    return rows || []
  }

  async findOne (model, id) {
    if (!model || !models[model]) throw boom.badRequest('Model not found')

    const item = await models[model].findByPk(id)
    if (!item) throw boom.notFound(`${model} not found`)

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

  async delete (model, id) {
    if (!model || !models[model]) throw boom.badRequest('Model not found')

    const item = await this.findOne(model, id)

    await item.destroy()

    return item || {}
  }
}

export default Services
