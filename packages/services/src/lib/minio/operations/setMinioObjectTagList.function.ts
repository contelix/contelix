import { TagList } from "minio";
import { getMinio } from "../getMinio.function";
import { MINIO_BUCKET } from "../../../env";

/**
 * Sets tags for Object
 * 
 * @param objectName 
 * @param tagList 
 * @returns void
 */
export async function setMinioObjectTagList(objectName: string, tagList: TagList) {
    const minioClient = await getMinio();
    return await minioClient.setObjectTagging(MINIO_BUCKET, objectName, tagList);
}