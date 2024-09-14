const mongoose = require("mongoose");

mongoose.connection.on("error", (error) => {
  console.log("mongodb connection failed!", error.message);
});
const DB = process.env.DB_HOST.replace('<db_password>',process.env.DB_PASS)
mongoose.connect(DB, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
}).then(()=>{
  console.log('mongo connect ...');
})
