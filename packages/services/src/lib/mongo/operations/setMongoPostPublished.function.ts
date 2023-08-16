import { getMongoPostsCollection } from "../getMongoPostsCollection.function";

export async function setMongoPostPublished(id: string, published?: boolean) {
    const collection = await getMongoPostsCollection();
    return await collection.updateOne({ _id: new Object(id) }, { published: published })
}