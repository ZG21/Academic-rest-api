/** packages */
const express = require("express");
const config = require("config");
const bodyParser = require("body-parser");

/** app configuration */
const app = express();
const port = config.get("server-port");
const jsonParser = bodyParser.json();
const urlEncodedParser = bodyParser.urlencoded(
 {extended: true}   
)

const ipFn = require("./middleware/getIpAddress");
app.use("*", ipFn);

app.use(jsonParser);
app.use(urlEncodedParser);

/** Methods */

app.get("/", (req, res, next) => {
    res.send("Welcome to academic rest api.");
});

//student routes loading
const studentRoutes = require("./routes/student.route");
studentRoutes(app);

//teacher routes loading
const teacherRoutes = require("./routes/teacher.route");
teacherRoutes(app);



app.listen(port , () => {
    console.log("Server is running...")
});