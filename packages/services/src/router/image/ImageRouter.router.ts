import { Router } from "express";
import multer from "multer";
import fs from "fs";
import { getMinioObject, getMinioObjectMeta, putMinioObject } from "@fluffy/common";

const ImageRouter = Router();

ImageRouter.use(async (req, res, next)=>{
    if(typeof req.headers["fluffy-user"] === "string") {
        next();
    } else {
        res.status(401).send("Unauthorized");
    }
})

ImageRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const { metaData } = await getMinioObjectMeta(id);
        const img = await getMinioObject(id);
        res.status(200).type(metaData["content-type"]);
        img.pipe(res);
    } catch (e: unknown) {
        res.status(404).send(`${id} not found`)
    }
})

const upload = multer({
    dest: `./cache/multer`
}).single('file');

ImageRouter.post("/", upload, async (req, res) => {
    try {
        const owner = typeof req.headers["fluffy-user"]==="string"?req.headers["fluffy-user"]:"unkown";

        await putMinioObject(req.file?.originalname || "", req.file?.path || "", owner, {
            "content-type": req.file?.mimetype || "application/appliaction"
        });
        
        fs.unlinkSync(req.file?.path || "");
        res.json({ ...req.file, status: "OK" });
    } catch (e: unknown) {
        res.status(500).send("Error on upload");
    }
})

export default ImageRouter;