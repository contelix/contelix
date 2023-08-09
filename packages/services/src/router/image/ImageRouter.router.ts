import { Router } from "express";
import multer from "multer";
import fs from "fs";
import { Image, addFluffyImage, getFluffyImage } from "../../lib";

const ImageRouter = Router();

ImageRouter.use(async (req, res, next) => {
    if (typeof req.headers["fluffy-user"] === "string") {
        next();
    } else {
        res.status(401).send("Unauthorized");
    }
})

ImageRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const { image, stream } = await getFluffyImage(id);
        res.status(200).type(image.mimeType);
        stream.pipe(res);
    } catch (e: unknown) {
        res.status(404).send(`${id} not found`)
    }
})

const upload = multer({
    dest: `./cache/multer`
}).single('file');

ImageRouter.post("/", upload, async (req, res) => {
    const owner = typeof req.headers["fluffy-user"] === "string" ? req.headers["fluffy-user"] : "unknown";
    const imageData: Image = {
        filename: req.file?.originalname || "",
        isPublished: false,
        mimeType: req.file?.mimetype || "application/appliaction",
        owner: owner,
        size: req.file?.size || 0,
    }

    try {
        const imageId = await addFluffyImage(req.file?.path || "", imageData)

        fs.unlinkSync(req.file?.path || "");
        res.json({ ...req.file, status: "OK", id: imageId });
    } catch (e: unknown) {
        console.log("Image Data", imageData)
        console.error(e);
        res.status(500).send("Error on upload");
    }
})

export default ImageRouter;