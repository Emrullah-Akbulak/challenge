import express from "express";
import home from "../routes/home";
import emailGenerator from "../routes/email-generator";

export const setRoutes = (app: express.Application) => {
  app.use("/email-generator/", emailGenerator);
  app.use("/", home);
};
