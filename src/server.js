import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import dotenv from "dotenv";
import bodyParser from "body-parser";
// import connection from "./config/connectDB";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

//config view engine
configViewEngine(app);

//config body-parser to post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// test connection
// connection();

//init web routes
initWebRoutes(app);


app.listen(PORT, () => {
    console.log(`Backend Nodejs is running on port ${PORT}`);
})