const express = require('express');
const path    = require('path');
const bodyParser = require('body-parser');

const index   = require('./routes/index');
const tasks   = require('./routes/tasks');

const app     = express();

// bagian view engine yang merender
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// untuk set statik folder
app.use(express.static(path.join(__dirname, 'client')));

// seting bagian body-parser
