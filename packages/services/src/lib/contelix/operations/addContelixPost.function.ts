import { putMinioObject } from "../../minio";
import { addMongoPost } from "../../mongo";
import { ContelixPost } from "../ContelixPost.interface";
import { generateObjectName } from "./helper";

const MIME_TYPE_UNKNOWN = "application/octet-stream";

/**
 * Creates a blank unpublished post just including file.
 * 
 * @param post - ContelixPost
 * @returns posts id
 */
export async function addContelixPost(post: ContelixPost): Promise<string> {
    const postId = await addMongoPost(post);
    await putMinioObject(
        generateObjectName(post.owner, postId, post.file.originalname),
        post.file.filename,
        post.owner,
        {
            "content-type": post.file.mimetype || MIME_TYPE_UNKNOWN
        }
    );
    return postId;
}