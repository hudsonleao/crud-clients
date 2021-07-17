const porta = process.env.APPLICATION_PORT;
const app = require('./configs/express')();

app.listen(porta, () => console.log(`CRUD client starting... \nURL: http://localhost:${porta} \nEnviroment: ${process.env.NODE_ENV}`));

module.exports = app;