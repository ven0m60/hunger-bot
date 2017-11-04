/**
 * Module Dependencies
 */
import * as express from "express";

/**
 * Create Express Server
 */
const app = express();

/**
 * Express Configuration
 */
app.set("port", process.env.PORT || 5000);


/**
 * Error Handler
 */
 app.use((req, res, next) => {
   const err = new Error("Not Found");
   err.status = 404;
   next(err);
 });

/**
 * Start Express Server
 */
app.listen(app.get("port"), () => {
  console.log(("Express server listening on port %d in %s mode"), app.get("port"), app.settings.env);
});
