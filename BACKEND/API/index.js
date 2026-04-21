const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

const app = express();

// CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'HEAD, GET, POST, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());

// Rota raiz
app.get('/', (req, res) => {
    res.json({ message: "API funcionando!" });
});

// Rotas da API
app.use('/api', routes);

// Conexão com MongoDB
const mongoURL = process.env.MONGO_URI;
mongoose.connect(mongoURL);
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('connected', () => console.log('Database Connected'));

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Started at ${PORT}`));

module.exports = app;