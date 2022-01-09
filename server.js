const express = require('express')
const connectDB = require('./config/db')

const app = express()

//Connect Database
connectDB()

app.get('/', (req, res) => res.send('API Running'))
const PORT = process.env.PORT || 5000
// ?  process.env.PORT will appear when deployed on Heroku

app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))

app.listen(PORT, () => console.log(` Server started on port ${PORT}`))
// ? `` and '' is the same, but we can call variable in `` with $
