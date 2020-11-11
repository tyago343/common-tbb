import errorHandler from "errorhandler";

import app from "./app";

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
const server = app.listen(process.env.SERVER_PORT, () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    process.env.SERVER_PORT,
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});

export default server;
