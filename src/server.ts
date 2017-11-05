// Module Dependencies
import * as express from "express";
import * as morgan from "morgan";
import * as dotenv from "dotenv";
import * as messenger from "./routes/messenger";

// Load environment variables from .env
dotenv.config({ path: ".env" });

// Create Express Server
const app = express();

// Express Configuration
app.set("port", process.env.PORT || 5000);
app.set("view engine", "pug");
app.use(morgan("combined"));

// Set Routes
app.use("/messenger", messenger);

// Handle 404 Errors
 app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
   const err = new Error( "Not Found" );
   err["status"] = 404;
   next(err);
 });

// Error Handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(err["status"] || 500).send();
});

// Start Express Server
app.listen(app.get("port"), () => {
  console.log(("Express server listening on port %d in %s mode"), app.get("port"), app.settings.env);
});
