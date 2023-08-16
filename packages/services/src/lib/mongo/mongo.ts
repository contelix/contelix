import { MongoClient, Db, Collection, ObjectId } from "mongodb";
import { MONGO_CONNECTION_STRING, MONGO_DATABASE_NAME, MONGO_IMAGES_COLLECTION_NAME } from "../../env";
import { ContelixPost } from "../contelix";

let mongoClient: undefined | MongoClient;

async function getMongo(): Promise<MongoClient> {
    if (mongoClient === undefined) {
        mongoClient = new MongoClient(MONGO_CONNECTION_STRING)
        console.log(`Mongo Client created.`)
    }
    return mongoClient;
}

async function getMongoDb(): Promise<Db> {
    const mongoClient = await getMongo();
    return mongoClient.db(MONGO_DATABASE_NAME);
}

async function getMongoPostsCollection(): Promise<Collection<ContelixPost>> {
    const db = await getMongoDb();
    return db.collection<ContelixPost>(MONGO_IMAGES_COLLECTION_NAME);
}

export async function addMongoPost(post: ContelixPost): Promise<string> {
    const collection = await getMongoPostsCollection();
    const image = await collection.insertOne(post);
    return image.insertedId.toString();
}

export async function findMongoPost(id: string): Promise<ContelixPost | null> {
    const collection = await getMongoPostsCollection();
    return await collection.findOne({ _id: new ObjectId(id) })
}

export async function setMongoPostDescription(id: string, description: string) {
    const collection = await getMongoPostsCollection();
    return await collection.updateOne({ _id: new Object(id) }, { description: description })
}

export async function setMongoPostPublished(id: string, published?: boolean) {
    const collection = await getMongoPostsCollection();
    return await collection.updateOne({ _id: new Object(id) }, { published: published })
}

export async function getMongoPostsOfUser(username: string) {
    const collection = await getMongoPostsCollection();
    return await collection.find({owner: username})
}