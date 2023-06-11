require("dotenv").config();
import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import bodyParser from "body-parser";
import configCors from "./config/cors";
import cookieParser from "cookie-parser";
// import connection from "./config/connectDB";


const app = express();
const PORT = process.env.PORT || 8080;

//config cors
configCors(app);

//config view engine
configViewEngine(app);

//config body-parser to post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// config cookie parser
app.use(cookieParser());

// test connection
// connection();



//init web routes
initWebRoutes(app);
initApiRoutes(app);


app.use((req, res) => {
    return res.send('404 not found  ');
})
app.listen(PORT, () => {
    console.log(`Backend Nodejs is running on port ${PORT}`);
})