import { ContelixErrorItemNotFound } from "../../errors";
import { findMongoPost } from "../../mongo";

export async function getContelixPostMeta(id: string) {
    const post = await findMongoPost(id);
    if (post) {
        return post;
    }
    throw new ContelixErrorItemNotFound(`ItemId ${id} not found.`)
}