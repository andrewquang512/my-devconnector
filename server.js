const express = require('express')

const app = express()

app.get('/', (req, res) => res.send('API Running'))
const PORT = process.env.PORT || 5000
// ?  process.env.PORT will appear when deployed on Heroku

app.listen(PORT, () => console.log(` Server started on port ${PORT}`))
// ? `` and '' is the same, but we can call variable in `` with $
