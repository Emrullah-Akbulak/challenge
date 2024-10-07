import express from "express";

//This might seem out of place but it is library to wrap express async errors
//It does not have a typescript support unfortunately
//See https://www.npmjs.com/package/express-async-errors
require("express-async-errors");

import cors from "cors";
import { error } from "./middleware/error";
import { response } from "./middleware/response";
import { setRoutes } from "./startup/routes";

const app: express.Application = express();
const port = process.env.PORT;

//Allow all origins for this small project, normally you would restrict it to your own origins
app.use(cors());

app.use(express.json({ limit: "50mb" }));

app.use(response);

//Setup routes for the api
setRoutes(app);

app.use(error);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

export default app;
