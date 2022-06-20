import { faker } from '@faker-js/faker'
import boom from '@hapi/boom'

class ProductsServices {
  constructor () {
    this.products = []

    this.generate()
  }

  generate () {
    const size = 100

    for (let i = 0; i < size; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: +faker.commerce.price(),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      })
    }
  }

  create (data) {
    const product = {
      id: faker.datatype.uuid(),
      ...data
    }

    this.products.push(product)
    return product
  }

  find ({ from = 0, limit = 100 }) {
    return this.products.slice(from, limit)
  }

  findOne (id) {
    const product = this.products.find(e => e.id === id)

    if (!product) throw boom.notFound('Product not found')
    if (product.isBlock) throw boom.conflict('Product is block')

    return product
  }

  update (id, changes) {
    const index = this.products.findIndex(e => e.id === id)
    if (index === -1) throw boom.notFound('Product not found')

    const product = this.products[index]

    const { name, price, image, isBlock } = { ...product, ...changes }
    changes = {
      name: name || product.name,
      price: price || product.price,
      image: image || product.image,
      isBlock: isBlock || product.isBlock
    }

    this.products[index] = { ...product, ...changes }
    return this.products[index]
  }

  delete (id) {
    const index = this.products.findIndex(e => e.id === id)
    if (index === -1) throw boom.notFound('Product not found')

    const product = this.products.splice(index, 1)
    return product
  }
}

export default ProductsServices
