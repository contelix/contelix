import bodyParser from "body-parser";
import "./env"
import express from "express";
import { HOSTNAME, PORT } from "./env";
import ImageRouter from "./router/minio/ImageRouter.router";

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/img", ImageRouter);

app.get("*", (_req, res) => {
    res.json({ok: 1});
})

app.listen(PORT, HOSTNAME, () => {
    console.log(`Server started on http://${HOSTNAME}:${PORT}`)
})