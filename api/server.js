const express = require('express')

var bodyParser = require('body-parser')
var cors = require('cors')
const path = require('path');
const connectDB = require('./config/db');

const http = require('http');

const app = express()

const PORT = process.env.PORT || 3010;

// Init Middleware
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use('/management', require('./routes/management'))
app.use('/remember', require('./routes/remember'))


connectDB()
app.get('/', (req, res) => {
    res.send('O server do remember é nesta rota e está ON. Acesse <a href="localhost:3000"/>!')
})


const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
    console.log(`GO http://localhost:${PORT}/`);
});


module.exports = { app, httpServer }   