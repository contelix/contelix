import { MongoClient } from "mongodb";
import { MONGO_CONNECTION_STRING } from "../../env";

let mongoClient: undefined | MongoClient;

export async function getMongo(): Promise<MongoClient> {
    if (mongoClient === undefined) {
        mongoClient = new MongoClient(MONGO_CONNECTION_STRING)
        console.log(`Mongo Client created.`)
    }
    return mongoClient;
}