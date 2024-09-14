const mongoose = require("mongoose");

mongoose.connection.on("error", (error) => {
  console.log("mongodb connection failed!", error.message);
});

mongoose.connect(`mongodb://localhost:27017/shoes`, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
}).then(()=>{
  console.log('mongo connect ...');
})
