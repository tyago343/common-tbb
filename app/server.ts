import errorHandler from "errorhandler";

import app from "./app";
import { sequelize } from "./config/database";

/**
 * Error Handler. Provides full stack - remove for production
 */
import dotenv from "dotenv";

// initialize configuration
dotenv.config();
app.use(errorHandler());

/**
 * Start Express server.
 */
const server = app.listen(process.env.SERVER_PORT, async () => {
  try {
    await sequelize.sync({force: true});
    console.log("Database connected.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    process.env.SERVER_PORT,
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});

export default server;
