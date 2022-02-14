const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect Database
connectDB();

// Init Middleware
//* The express.json() function is a built-in middleware function in Express.
//* It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json({ extended: false }));
// ? Middleware is the functions that execute after
// ? the server receives the request and
// ? before the controller action sends the response
// ? Middleware has access to the response (res) and request (req) variables
// ? Middleware also have next() function to make an order
// ? -- called for the next middleware to be executed

app.get('/', (req, res) => res.send('API Running'));
const PORT = process.env.PORT || 5000;
// ?  process.env.PORT will appear when deployed on Heroku

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

app.listen(PORT, () => console.log(` Server started on port ${PORT}`));
// ? `` and '' is the same, but we can call variable in `` with $
