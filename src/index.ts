import express, { NextFunction, Request, Response } from "express";
import "dotenv/config";
const server = express();
import session from "express-session";
import { passport } from "./auth/auth";

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(session({ secret: "cats" }));
server.use(passport.initialize());
server.use(passport.session());

function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  req.user ? next() : res.sendStatus(401);
}

server.get("/", (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

server.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

server.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/failure",
  })
);

server.get("/protected", isLoggedIn, (req, res) => {
  res.send("User Logger sucess!");
});

server.get("/auth/failure", (req, res) => {
  res.send("error ao autenticar");
});

server.get("/logout", (req, res) => {
  req.logOut((err) => console.log(err));
  req.session.destroy((err) => console.log(err));
  res.send("exit success!");
});

server.listen(process.env.SERVER_PORT, () => console.log("Server running"));
