var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, (err, res) => {
  if (err) throw err;

  console.log("Mongodb is up");
});

module.exports = { mongoose };
