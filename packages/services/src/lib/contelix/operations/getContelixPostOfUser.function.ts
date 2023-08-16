import { getMongoPostsOfUser } from "../../mongo";

export async function getContelixPostOfUser(username: string) {
    return (await getMongoPostsOfUser(username)).toArray();
}