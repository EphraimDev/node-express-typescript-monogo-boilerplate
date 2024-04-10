import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "../utils/logger";
import chalk from "chalk";

dotenv.config();
const { DATABASE_URL } = process.env;

const connectDB = async () => {
  try {
    if (!DATABASE_URL) {
      console.log(
        chalk.red.bold(
          `Your database connection string is missing in your env file`
        )
      );
      return
    }
    await mongoose.connect(DATABASE_URL!);
    console.log(
      chalk.green.bold(`⚡️[Database]: Database connection successful`)
    );
  } catch (err: any) {
    console.log(err);
    logger(module).error(`Failed to connect to database: ${err.message}`);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
