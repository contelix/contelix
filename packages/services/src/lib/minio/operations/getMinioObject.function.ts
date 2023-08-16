import { MINIO_BUCKET } from "../../../env";
import { getMinio } from "../getMinio.function";

/**
 * Gets stream of object.
 * 
 * @param name - object name
 * @returns stream of object
 */
export async function getMinioObject(name: string) {
    const minioClient = await getMinio();
    return await minioClient.getObject(MINIO_BUCKET, name);
}