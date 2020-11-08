import express from 'express';
import {sequelize} from './db'
const app: express.Application = express()

app.get('/', function(req, res) {
    res.send('Hello world');
})
app.listen(3000, async function() {
    console.log('Example app listening on port 3001!')
    await sequelize.sync({force: true}).then(() => {
        console.log('hola nase de datos')
    }).catch(console.log)
})