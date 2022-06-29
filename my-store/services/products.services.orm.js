const { faker } = require('@faker-js/faker')
const boom = require('@hapi/boom')
const sequelize = require('../database/sequelize.js')
const { Product } = sequelize.models

class ProductsServices {
  generate (size = 10) {
    return Array.from({ length: size }, () => {
      return {
        name: faker.commerce.productName(),
        price: +faker.commerce.price(),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      }
    })
  }

  setProductList () {
    this.products = this.generate()

    const query = 'INSERT INTO products (?) VALUE ?'
    const fields = Object.keys(this.products[0])
    const values = this.products.map(product => Object.values(product))

    const sql = this.connection.format(query, [fields]).replace(/'/ig, '')

    return new Promise((resolve, reject) => {
      this.connection.query(sql, [values], async (err, data) => {
        if (err) return reject(err)
        resolve(data)
      })
    })
  }

  create (data) {
    const query = 'INSERT INTO products SET ?'

    return new Promise((resolve, reject) => {
      this.connection.query(query, data, async (err, data) => {
        if (err) return reject(err)
        resolve(data)
      })
    })
  }

  async find ({ from = 1, limit = 100 }) {
    const products = await Product.findAll()
    return products || []
  }

  async findOne (id) {
    const product = await Product.findByPk(id)

    if (!product) throw boom.notFound('Product not found')
    if (product.isBlock) throw boom.forbidden('Product is blocked')

    return product || {}
  }

  update (id, changes) {
    const query = `UPDATE products SET ? WHERE id = ${id}`

    return new Promise((resolve, reject) => {
      this.connection.query(query, changes, async (err, data) => {
        if (err) return reject(err)

        if (data.affectedRows === 0) reject(boom.notFound('Product not found'))

        resolve(data)
      })
    })
  }

  delete (id) {
    const query = `DELETE FROM products WHERE id = ${id}`

    return new Promise((resolve, reject) => {
      this.connection.query(query, async (err, data) => {
        if (err) return reject(err)

        if (data.affectedRows === 0) reject(boom.notFound('Product not found'))

        resolve(data)
      })
    })
  }
}

module.exports = ProductsServices
