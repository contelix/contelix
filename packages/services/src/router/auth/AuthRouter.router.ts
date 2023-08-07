import { Router } from "express";

const AuthRouter = Router();

AuthRouter.post("/", (req, res) => {
    res.status(404).send("Not implemented!")
})

AuthRouter.post("/logout", (req, res) => {
    res.status(404).send("Not implemented!")
})

export default AuthRouter;