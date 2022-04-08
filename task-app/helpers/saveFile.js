const fs = require('fs')

const pathDB = './db/tasks.json'

const saveFile = ( data ) => {
  fs.writeFileSync( pathDB, JSON.stringify(data) )
}

const readDB = () => {

  if( !fs.existsSync(pathDB) ) {
    return null
  }
  const info = fs.readFileSync( pathDB, {encoding: 'utf-8'} )
  const data = JSON.parse(info)

  return data
}

module.exports = {
  saveFile,
  readDB
}