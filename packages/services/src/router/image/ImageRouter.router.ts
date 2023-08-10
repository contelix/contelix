import { Request, Router } from "express";
import multer from "multer";
import fs from "fs";
import { CACHE_MULTER, FluffyPost, addFluffyPost, getFluffyPost } from "../../lib";
import FluffyError from "../../lib/errors/FluffyError.error";

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
        const { post, stream } = await getFluffyPost(id);
        res.status(200).type(post.file.mimetype);
        stream.pipe(res);
    } catch (e: unknown) {
        res.status(404).send(`${id} not found`)
    }
})

const upload = multer({
    dest: CACHE_MULTER
}).single('file');

async function requestToFluffyPost(req: Request): Promise<FluffyPost> {
    const owner = typeof req.headers["fluffy-user"] === "string" ? req.headers["fluffy-user"] : "unknown";
    
    if(!req.file) {
        throw new FluffyError(`Request is missing file`);  
    }

    return  {
        file: req.file,
        owner: owner,
    }
}

ImageRouter.post("/", upload, async (req, res) => {
    const fluffyPost = await requestToFluffyPost(req);
    try {
        const imageId = await addFluffyPost(fluffyPost);
        fs.unlinkSync(fluffyPost.file?.path || "");
        res.json(fluffyPost);
    } catch (e: unknown) {
        console.log("Image Data", fluffyPost)
        console.error(e);
        res.status(500).send("Error on upload");
    }
})

export default ImageRouter;