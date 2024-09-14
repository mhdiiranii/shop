const express = require("express");
const bodyParser = require("body-parser");

const app = express();

require('./boot')
require('./middleware')(app)
require('./router')(app)

app.listen(3333, () => {
  console.log("app is working ...");
});
