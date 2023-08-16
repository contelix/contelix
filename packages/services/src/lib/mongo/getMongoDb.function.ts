import { Db } from "mongodb";
import { getMongo } from "./getMongo.function";
import { MONGO_DATABASE_NAME } from "../../env";

export async function getMongoDb(): Promise<Db> {
    const mongoClient = await getMongo();
    return mongoClient.db(MONGO_DATABASE_NAME);
}