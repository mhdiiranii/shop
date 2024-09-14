const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require('dotenv')

dotenv.config('../.env')
const app = express();

require('./boot')
require('./middleware')(app)
require('./router')(app)

app.listen(process.env.PORT, () => {
  console.log("app is working ...");
});
