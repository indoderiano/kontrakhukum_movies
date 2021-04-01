const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const cors = require('cors')

if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'){
    require('dotenv').config()
}

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('kontrak hukum movie database')
})


const {RouterMovies} = require('./routes/RouterMovies')
app.use('/', RouterMovies)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})