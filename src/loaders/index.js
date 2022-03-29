import { ExpressServer } from "./server/expressServer.js";
import sequelize from "./sequelize/index.js";
import { port } from "../config/index.js";
import logger from "./logger/index.js";

const startLoader = async () => {
  try {
    await sequelize.authenticate();
    sequelize.sync({ alter: true });
    logger.info("Database Loaded and Connected 🔗");

    const server = new ExpressServer();
    server.start();
    logger.info(`Server listening on port: ${port} 🔥`);
  } catch (err) {
    console.error("Unable to connect to the database! ❌", err);
  }
};

export default startLoader;
