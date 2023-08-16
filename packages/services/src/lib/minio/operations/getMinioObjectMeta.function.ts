import { MINIO_BUCKET } from "../../../env";
import { getMinio } from "../getMinio.function";

/**
 * Gets object meta.
 * 
 * @param name - object name
 * @returns BucketItemStat
 */
export async function getMinioObjectMeta(name: string) {
    const minioClient = await getMinio();
    return await minioClient.statObject(MINIO_BUCKET, name);
}