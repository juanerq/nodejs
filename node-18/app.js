import dotenv from "dotenv"
dotenv.config()

import express from "express"
const app = express()

const port = process.env.PORT



const getCountries = async () => {
  const reponse = await fetch('https://hiring.condorlabs.io/api/countries/all')
  const json = await reponse.json()
  return json
}


app.get('/:region', (req, res) => {

  const { region } = req.params

  getCountries().then(resp => {

    // const result = resp.filter(reg => reg.region.toLowerCase() === region.toLowerCase())
    const names = resp.map(r => r.region)
    res.json(names)

  }).catch(console.error)

})

app.use( (req, res) => {
  res.status(400).end()
})


app.listen(port, () => {
    console.log(`server running in the port ${port}`)
})