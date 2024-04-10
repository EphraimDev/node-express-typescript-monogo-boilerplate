import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import logger from "./logger";
import apiDocumentation from "../docs";
import chalk from "chalk";

function swaggerDocs(app: Express, port: number) {
  //swagger page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(apiDocumentation));

  logger(module).info(
    chalk.green(`Docs available at http://localhost:${port}/docs`)
  );
}

export default swaggerDocs;
