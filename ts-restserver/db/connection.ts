import { Sequelize } from 'sequelize'

const db = new Sequelize('curso_node', 'root', 'Ju@n1004870915', {
  host: 'localhost',
  dialect: 'mysql'
})

export default db