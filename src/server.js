import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
import dotenv from "dotenv";
import bodyParser from "body-parser";



dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

//config view engine
configViewEngine(app);

//config body-parser to post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//init web routes
initWebRoutes(app);


app.listen(PORT, () => {
    console.log(`Backend Nodejs is running on port ${PORT}`);
})