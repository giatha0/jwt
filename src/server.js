import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import configCors from "./config/cors";
// import connection from "./config/connectDB";
import { createJWT, verifyJWT } from "./middleware/JWTAction"


dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

//config cors
configCors(app);

//config view engine
configViewEngine(app);

//config body-parser to post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// test connection
// connection();

// test jwt
createJWT();
verifyJWT("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhhbyIsImFkZHJlc3MiOiJIYSBOb2kiLCJpYXQiOjE2ODYzOTY2MTB9.OW4TXK79Wx4z0_UX9-vr5gz7bphPzrHFLEOYnW0BW4w");

//init web routes
initWebRoutes(app);
initApiRoutes(app);

app.listen(PORT, () => {
    console.log(`Backend Nodejs is running on port ${PORT}`);
})