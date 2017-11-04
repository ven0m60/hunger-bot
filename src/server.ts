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
 * Handle 404 Errors
 */
 app.use((req, res) => {
   res.sendStatus(404);
 });

/**
 * Start Express Server
 */
app.listen(app.get("port"), () => {
  console.log(("Express server listening on port %d in %s mode"), app.get("port"), app.settings.env);
});
