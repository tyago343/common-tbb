import express from 'express';
import {sequelize} from './db'
const app: express.Application = express()

app.get('/', function(req, res) {
    res.send('Hello world');
})
app.listen(3000, function() {
    console.log('Example app listening on port 3001!')
    sequelize.authenticate().then(() => {
        console.log('hola nase de datos')
    }).catch(console.log)
})