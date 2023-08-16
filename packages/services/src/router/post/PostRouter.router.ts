import { Request, Router } from "express";
import multer from "multer";
import fs from "fs";
import { CACHE_MULTER, ContelixError, ContelixPost, addContelixPost, getContelixPost, getContelixPostMeta, setContelixPostDescription } from "../../lib";

const PostRouter = Router();
const HEADER_FIELDNAME_USER = "user"

PostRouter.use(async (req, res, next) => {
    if (typeof req.headers[HEADER_FIELDNAME_USER] === "string") {
        next();
    } else {
        res.status(401).send("Unauthorized");
    }
})

PostRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const { post, stream } = await getContelixPost(id);
        res.status(200).type(post.file.mimetype);
        stream.pipe(res);
    } catch (e: unknown) {
        res.status(404).send(`${id} not found`)
    }
})

// TODO: Test
PostRouter.get("/meta/:id", async (req, res) => {
    const { id } = req.params;
    try {
        return getContelixPostMeta(id);
    } catch (e: unknown) {
        res.status(404).send(`${id} not found`)
    }
})

const upload = multer({
    dest: CACHE_MULTER
}).single('file');

async function requestToContelixPost(req: Request): Promise<ContelixPost> {
    const owner = typeof req.headers[HEADER_FIELDNAME_USER] === "string" ? req.headers[HEADER_FIELDNAME_USER] : "unknown";

    if (!req.file) {
        throw new ContelixError(`Request is missing file`);
    }

    return {
        file: req.file,
        owner: owner,
    }
}

PostRouter.post("/", upload, async (req, res) => {
    const contelixPost = await requestToContelixPost(req);
    try {
        await addContelixPost(contelixPost);
        fs.unlinkSync(contelixPost.file?.path || "");
        res.json(contelixPost);
    } catch (e: unknown) {
        console.log("Image Data", contelixPost)
        console.error(e);
        res.status(500).send("Error on upload");
    }
})

PostRouter.post("/description", async (req, res) => {
    const { id, description } = req.body;
    if (typeof id === "string" || typeof description === "string") {
        res.send(await setContelixPostDescription(id, description));
    } else {
        res.status(400).send("Wrong parameters")
    }
})

export default PostRouter;