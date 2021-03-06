// Load environment variables from .env
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

// Module Dependencies
import * as express from "express";
import * as morgan from "morgan";
import * as messenger from "./routes/messenger";
import * as ai from "./routes/ai";

// Create Express Server
const app = express();

// Express Configuration
app.set("port", process.env.PORT || 5000);
app.set("view engine", "pug");
app.use(morgan("combined"));

// Set Routes
app.use("/messenger", messenger.router);
app.use("/webhook-ai", ai.router);

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
const server: any = app.listen(app.get("port"), () => {
  console.log(("Express server listening on port %d in %s mode"), app.get("port"), app.settings.env);
});

export { server } ;
