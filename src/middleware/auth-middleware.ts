import { Request, NextFunction, Response } from "express";

function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  req.user ? next() : res.sendStatus(401);
}

export { isLoggedIn };
