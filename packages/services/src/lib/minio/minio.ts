import { Client, ClientOptions, ItemBucketMetadata, TagList } from "minio";
import { CACHE_MULTER, MINIO_ACCESS_KEY, MINIO_BUCKET, MINIO_END_POINT, MINIO_PORT, MINIO_SECRET_KEY, MINIO_USE_SSL } from "../../env";

let minioClient: undefined | Client;

/**
 * Creates a minio Client. If clientOptions is set with these data otherwise with environmental data.
 * @param clientOptions - optional replaces environmental data
 * @returns minio Client
 */
function createMinioClient(clientOptions?: ClientOptions): Client {
    return new Client(clientOptions || {
        endPoint: MINIO_END_POINT,
        port: MINIO_PORT,
        useSSL: MINIO_USE_SSL,
        accessKey: MINIO_ACCESS_KEY,
        secretKey: MINIO_SECRET_KEY
    });
}

/**
 * Singleton for minio Client
 * @returns minio Client
 */
async function getMinio(): Promise<Client> {
    if (minioClient) {
        return minioClient;
    }

    minioClient = createMinioClient();

    console.log(`Minio Client created.`)

    if (!await minioClient.bucketExists(MINIO_BUCKET)) {
        await minioClient.makeBucket(MINIO_BUCKET);
        console.log(`Bucket '${MINIO_BUCKET}' was created successfully.`)
    }

    return minioClient;
}

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