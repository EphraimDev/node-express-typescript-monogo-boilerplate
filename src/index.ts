import express, { Request, Response } from "express";
import http from "http";
import cors from "cors";
import rtracer from "cls-rtracer";
import dotenv from "dotenv";
import chalk from "chalk";
import path from "path";
import connectDB from "./database";
import appRoutes from "./modules";
import swaggerDocs from "./utils/swagger";
import multer from "./utils/multer";
import logger from "./utils/logger";

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
  return res.send("Welcome to CBN RTGS4 API V1.0.0");
});

async function bootstrap() {
  app.use(rtracer.expressMiddleware());

  if (
    process.env.NODE_ENV &&
    ["production", "staging"].includes(process.env.NODE_ENV)
  ) {
    const whitelist = process.env.ALLOWED_URLS?.split(";");
    const corsOptions = {
      origin: function (origin: string | undefined, callback: any) {
        if (!origin) {
          //for bypassing postman req with  no origin
          return callback(null, true);
        }
        if (whitelist?.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
    };
    app.use(cors(corsOptions));
    app.use("/logs", express.static(path.join(__dirname, "../../logs")));
  } else {
    app.use(cors());
    app.use("/logs", express.static(path.join(__dirname, "../logs")));
  }

  app.use(multer.fields([{ name: "file", maxCount: 1 }]));

  app.use("/api", appRoutes);

  const port = process.env.PORT || 7402;

  if (process.env.NODE_ENV !== "production") swaggerDocs(app, Number(port));

  // UNHANDLED ROUTES
  app.all("*", (req: Request, res: Response) => {
    return res.status(404).json({
      status: "error",
      data: { message: `Route ${req.originalUrl} not found` },
    });
  });

  app.use((err: any, req: Request, res: Response) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message });
  });

  server.listen(port, async () => {
    connectDB();
    console.log(chalk.green.bold(`REST API on http://localhost:${port}/`));
  });
}

bootstrap()
  .catch((err) => {
    throw err;
  })
  .finally(async () => {
    const sigs = ["SIGINT", "SIGTERM", "SIGQUIT"];
    sigs.forEach((sig) => {
      process.on(sig, () => server.close());
    });
  });
