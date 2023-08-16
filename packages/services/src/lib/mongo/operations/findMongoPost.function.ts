import { ObjectId } from "mongodb";
import { ContelixPost } from "../../contelix";
import { getMongoPostsCollection } from "../getMongoPostsCollection.function";

export async function findMongoPost(id: string): Promise<ContelixPost | null> {
    const collection = await getMongoPostsCollection();
    return await collection.findOne({ _id: new ObjectId(id) })
}