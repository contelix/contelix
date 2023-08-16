import { ContelixPost } from "../../contelix";
import { getMongoPostsCollection } from "../getMongoPostsCollection.function";

export async function addMongoPost(post: ContelixPost): Promise<string> {
    const collection = await getMongoPostsCollection();
    const image = await collection.insertOne(post);
    return image.insertedId.toString();
}