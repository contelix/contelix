import { getMongoPostsCollection } from "../getMongoPostsCollection.function";

export async function getMongoPostsOfUser(username: string) {
    const collection = await getMongoPostsCollection();
    return await collection.find({owner: username})
}