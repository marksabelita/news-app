const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const apicache = require('apicache');
let cache = apicache.middleware
 
app.use(cache('5 minutes'))
app.use(cors()); 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const newsController = require('./api/news/controller');

app.use(express.static('dist'));
app.get('/api/sources', newsController.getSources);
app.get('/api/news/:source', newsController.getNewsBySource);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Listening on port ' + port));