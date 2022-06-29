'use strict'

import { UserSchema, USER_TABLE_NAME } from '../../models/user.model.js'

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE_NAME, UserSchema)
  },

  async down (queryInterface) {
    await queryInterface.drop(USER_TABLE_NAME)
  }
}
