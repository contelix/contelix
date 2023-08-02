import { Router } from "express";
import {Client} from "minio";
import { MINIO_ACCESS_KEY, MINIO_BUCKET, MINIO_END_POINT, MINIO_PORT, MINIO_SECRET_KEY, MINIO_USE_SSL } from "../../env";

const minioClient = new Client({
    endPoint: MINIO_END_POINT,
    port: MINIO_PORT,
    useSSL: MINIO_USE_SSL,
    accessKey: MINIO_ACCESS_KEY,
    secretKey: MINIO_SECRET_KEY
});

const ImageRouter = Router();

ImageRouter.get("/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const img = await minioClient.getObject(MINIO_BUCKET, id);
        res.status(200).type("image/jpeg");
        img.pipe(res);
    } catch(e:unknown) {
        res.status(404).send(`${id} not found`)
    }
})

export default ImageRouter;