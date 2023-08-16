import { setMongoPostDescription } from "../../mongo";

export async function setContelixPostDescription(id: string, description: string) {
    const result = await setMongoPostDescription(id, description);
    return {
        updated: result.modifiedCount
    }
}