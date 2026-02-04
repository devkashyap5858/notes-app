const mongoose = require('mongoose');

function connectToDb(){
  mongoose.connect(process.env.MONGODB_URL)
  .then(()=>{
    console.log("DB Connected Successfully");
  })
}

module.exports = connectToDb