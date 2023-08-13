import "dotenv/config";
import express from "express";

const server = express();
import session from "express-session";

import { router } from "../src/routes/routes";
import { passport } from "./auth/auth";

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.set("view engine", "ejs");
server.set("views", __dirname + "/views");

server.use(session({ secret: "cats" }));
server.use(passport.initialize());
server.use(passport.session());

server.use(router);

server.listen(process.env.SERVER_PORT, () => console.log("Server running"));
