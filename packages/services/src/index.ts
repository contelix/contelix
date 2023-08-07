import bodyParser from "body-parser";
import express from "express";
import { HOSTNAME, PORT } from "@fluffy/common";
import ImageRouter from "./router/image/ImageRouter.router";
import AuthRouter from "./router/auth/AuthRouter.router";

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/img", ImageRouter);
app.use("/auth", AuthRouter);

app.get("*", (_req, res) => {
    res.status(404).send("Not available.")
})

app.listen(PORT, HOSTNAME, () => {
    console.log(`Server started on http://${HOSTNAME}:${PORT}`)
})