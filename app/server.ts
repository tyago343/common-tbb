import errorHandler from "errorhandler";

import app, { sequelize } from "./app";

/**
 * Error Handler. Provides full stack - remove for production
 */
import dotenv from "dotenv";
import User from "./models/user.model";

// initialize configuration
dotenv.config();
app.use(errorHandler());

/**
 * Start Express server.
 */
const server = app.listen(process.env.SERVER_PORT, async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Connection has been established successfully.");
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
