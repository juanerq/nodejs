const { faker } = require('@faker-js/faker')
const boom = require('@hapi/boom')
const ConnectionDB = require('../database/connection.js')

class ProductsServices {
  constructor () {
    this.products = []

    this.connectionDB = new ConnectionDB()
    this.connection = this.connectionDB.getConnection()

    // this.setProductList()
  }

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

  find ({ from = 1, limit = 100 }) {
    const query = 'SELECT * FROM products LIMIT ?, ?'

    return new Promise((resolve, reject) => {
      this.connection.query(query, [+from - 1, +limit], async (err, data) => {
        if (err) return reject(err)
        resolve(data || [])
      })
    })
  }

  findOne (id) {
    const query = `SELECT * FROM products WHERE id = ${id}`

    return new Promise((resolve, reject) => {
      this.connection.query(query, async (err, data) => {
        if (err) return reject(err)

        if (data.length === 0) return reject(boom.notFound('Product not found'))
        if (data[0]?.isBlock) reject(boom.conflict('Product is block'))

        resolve(data || [])
      })
    })
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
