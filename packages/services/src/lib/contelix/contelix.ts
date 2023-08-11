import { getMinioObject, putMinioObject } from "../minio";
import { addMongoPost, findMongoPost } from "../mongo/mongo";
import type { Readable as ReadableStream } from 'node:stream'
import { ContelixPost } from "./ContelixPost.interface";
import { ContelixErrorItemNotFound } from "../errors";

const MIME_TYPE_UNKNOWN = "application/octet-stream";
export interface ContelixImage {
    post: ContelixPost,
    stream: ReadableStream
}

/**
 * Generates an object name from owner, imageId and filename
 * 
 * @param {string} owner 
 * @param {string} imageId 
 * @param {string} filename 
 * @returns {string} generated object name
 */
function generateObjectName(owner: string, imageId: string, filename: string): string {
    return `users/${owner}/${imageId}-${filename}`;
}

/**
 * Respons everything needed so send http response for given id of found. ContelixPost includes meta and stream.
 * 
 * @param id - id of an image
 * @returns Promise<ContelixPost> if image was found for id
 */
export async function getContelixPost(id: string): Promise<ContelixImage> {
    const post = await findMongoPost(id);
    if (post === null) {
        throw new ContelixErrorItemNotFound(`Not item found for: ${id}`);
    }
    const objectName = generateObjectName(post.owner, post._id?.toString() || "", post.file.originalname);

    return {
        post: post,
        stream: await getMinioObject(objectName)
    }
}

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