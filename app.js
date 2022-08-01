const { urlencoded } = require('express')
const express = require('express')
const app = express()
const routes = require('./routes')
const connectDB = require('./db')
app.use(urlencoded({extended: false}))
app.use(express.json())
app.use('/tasks', routes )
const start = async() => {
    await connectDB()
    app.listen(8080, () => {
        console.log(`Listening to port 8080...`)
    })
}
start()