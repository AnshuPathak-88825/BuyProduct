const mongoose=require('mongoose');

mongoose.connect(process.env.DB_URI);
const db=mongoose.connection;
db.on('error',console.error.bind(console,"error connecting to db"));
db.once('open',function(){
    console.log("successfully connected to the database");
});
console.log("mongoose connected");
module.exports=db;