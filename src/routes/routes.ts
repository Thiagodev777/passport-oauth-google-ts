import { Router } from "express";
import { passport } from "../auth/auth";
import { isLoggedIn } from "../middleware/auth-middleware";

const router = Router();

router.get("/", (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/home",
    failureRedirect: "/auth/failure",
  })
);

router.get("/home", isLoggedIn, (req, res) => {
  res.render("index", { user: req.user, port: process.env.SERVER_PORT });
});

router.get("/auth/failure", (req, res) => {
  res.status(500).send("authentication error!");
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => console.log(err));
  res.redirect("/");
});

export { router };
