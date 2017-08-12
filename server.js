const express = require('express');
const path    = require('path');
const bodyParser = require('body-parser');

const index   = require('./routes/index');
const tasks   = require('./routes/tasks');

const app     = express();
const port    = 3000;

// bagian view engine yang merender
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// untuk set statik folder
app.use(express.static(path.join(__dirname, 'client')));

// seting bagian body-parser midle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// routes part
app.use('/', index);
app.use('/api', tasks);

app.listen(3000, () => {
  console.log('server started at port '+port);
});
