const express = require('express')
const path = require('path')
const qr = require('qrcode')
const bodyParser = require('body-parser')

const app = express()
const PORT = 5000

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.urlencoded())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set(express.static('public'))

app.get('/', (req, res) => {
    res.status(200).render("index")
})

app.post('/', (req, res) => {
    res.status(200).render("index")
})

app.get('/scan', (req, res) => {
    res.status(200).render("scan")
})

app.post('/scan', (req, res) => {
    const url = req.body.url
    if (url.length === 0) res.send("Empty data!")

    qr.toDataURL(url, (err, src) => {
        if (err) res.send("Error occured")
        res.render("scan", { src })
    })
})

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`)
})