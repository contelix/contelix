import { MongoClient, Db, Collection, ObjectId } from "mongodb";
import { MONGO_CONNECTION_STRING, MONGO_DATABASE_NAME, MONGO_IMAGES_COLLECTION_NAME } from "../../env";
import { Image } from "../fluffy";

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

async function getMongoImagesCollection(): Promise<Collection<Image>> {
    const db = await getMongoDb();
    return db.collection<Image>(MONGO_IMAGES_COLLECTION_NAME);
}

export async function addMongoImage(imageData: Image): Promise<string> {
    const collection = await getMongoImagesCollection();
    const image = await collection.insertOne(imageData);
    return image.insertedId.toString();
}

export async function findMongoImage(id: string): Promise<Image | null> {
    const collection = await getMongoImagesCollection();
    return await collection.findOne({ _id: new ObjectId(id) })
}