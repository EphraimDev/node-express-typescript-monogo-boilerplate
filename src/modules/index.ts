import express from "express";
import TestRoutes from "./test";
import handleRequest from "../helpers/request";

const app = express();

app.use(handleRequest);

app.use("/test", TestRoutes);

export default app;
