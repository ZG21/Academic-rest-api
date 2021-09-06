/**Packages */
const mongoose = require("mongoose");
const config = require("config");
const mongodbInfo = config.get("db-connections.mongodb");
const connStr = `mongodb+srv://${mongodbInfo.user}:${mongodbInfo.password}@${mongodbInfo.host}/${mongodbInfo.dbname}?retryWrites=true&w=majority`;



module.exports = async () => {
    mongoose.connect(connStr);

    mongoose.connection.on("connected", () => {
        console.log("mongodb server connected!");
    });

    mongoose.connection.on("disconnected", () => {
        console.log("mongodb server disconnected!");
    });

    mongoose.connection.on("error", () => {
        console.log("mongodb server connection error!");
    });

    mongoose.connection.on("SIGINT", () => {
        console.log("mongodb server shutting down!");
    });


};


//user: UserProg3
//password: manizales2021

