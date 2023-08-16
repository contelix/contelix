import { ItemBucketMetadata } from "minio";
import { CACHE_MULTER, MINIO_BUCKET } from "../../../env";
import { getMinio } from "../getMinio.function";
import { setMinioObjectTagList } from "./setMinioObjectTagList.function";

/**
 * Puts a file to Minio
 * 
 * @param objectName 
 * @param filePath - file to be added
 * @param owner 
 * @param metaData 
 * @returns UploadObjectInfo
 */
export async function putMinioObject(objectName: string, filePath: string, owner: string, metaData?: ItemBucketMetadata) {
    const minioClient = await getMinio();
    const putResult = await minioClient.fPutObject(MINIO_BUCKET, objectName, `${CACHE_MULTER}/${filePath}`, metaData);
    await setMinioObjectTagList(objectName || "", { owner: owner })
    return putResult;
}