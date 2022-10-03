const express = require('express')
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const router = express.Router();

app.post('/', function(req, res) {
  res.send('this is my mock post demo')
});

router.use('/', require('./login/index'))

app.get('/', function(req, res) {
  res.send('this is my mock get demo')
});

router.use('/user/', require('./user/index'))

app.use('/api', router)

app.listen(3080)
