import mongoose = require("mongoose");

let connectString = 'mongodb://localhost/blogs'

export default (connectionString:string) => {
    const connect = () => {
        mongoose.connect(connectionString, {
            socketTimeoutMS: 0,
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
          })
        .then(() => {
            return console.log(`Successfully connected to ${connectionString}`);
        })
        .catch((error:Error) => {
            console.log("Error connecting to database: ", error);
            return process.exit(1);
        });
    };
  connect();

  mongoose.connection.on("disconnected", connect);
};