import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routers/userRoutes.js";
import urlRoutes from "./routers/urlRoutes.js";
import errorHandler from "./middleware/ErrorMiddleware.js";
import cors from 'cors';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,POST,DELETE",
    credentials: true,
  })
);

const sessionSecret = process.env.SESSION_SECRET || "default_secret_key";

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use("/api/", userRoutes);
app.use("/api/url/", urlRoutes);

connectDB();
const port = process.env.PORT || 5000;

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port} and ${process.env.MONGO_URL}`);
});
