import { Collection } from "mongodb";
import { MONGO_IMAGES_COLLECTION_NAME } from "../../env";
import { ContelixPost } from "../contelix";
import { getMongoDb } from "./getMongoDb.function";

export async function getMongoPostsCollection(): Promise<Collection<ContelixPost>> {
    const db = await getMongoDb();
    return db.collection<ContelixPost>(MONGO_IMAGES_COLLECTION_NAME);
}