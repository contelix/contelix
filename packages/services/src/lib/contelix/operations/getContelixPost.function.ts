import { ContelixErrorItemNotFound } from "../../errors";
import { getMinioObject } from "../../minio";
import { findMongoPost } from "../../mongo";
import { ContelixPostWrapper } from "../ContelixPostWrapper.interface";
import { generateObjectName } from "./helper";

/**
 * Respons everything needed so send http response for given id of found. ContelixPost includes meta and stream.
 * 
 * @param id - id of an image
 * @returns Promise<ContelixPost> if image was found for id
 */
export async function getContelixPost(id: string): Promise<ContelixPostWrapper> {
    const post = await findMongoPost(id);
    if (post === null) {
        throw new ContelixErrorItemNotFound(id);
    }
    const objectName = generateObjectName(post.owner, post._id?.toString() || "", post.file.originalname);

    return {
        post: post,
        stream: await getMinioObject(objectName)
    }
}