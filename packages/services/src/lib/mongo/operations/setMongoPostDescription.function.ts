import { getMongoPostsCollection } from "../getMongoPostsCollection.function";

export async function setMongoPostDescription(id: string, description: string) {
    const collection = await getMongoPostsCollection();
    return await collection.updateOne({ _id: new Object(id) }, { description: description })
}