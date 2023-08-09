import { Client, ItemBucketMetadata, TagList } from "minio";
import { MINIO_ACCESS_KEY, MINIO_BUCKET, MINIO_END_POINT, MINIO_PORT, MINIO_SECRET_KEY, MINIO_USE_SSL } from "../../env";

let minioClient: undefined | Client;

async function getMinio(): Promise<Client> {
    if (minioClient) {
        return minioClient;
    }

    minioClient = new Client({
        endPoint: MINIO_END_POINT,
        port: MINIO_PORT,
        useSSL: MINIO_USE_SSL,
        accessKey: MINIO_ACCESS_KEY,
        secretKey: MINIO_SECRET_KEY
    });

    console.log(`Minio Client created.`)

    if (!await minioClient.bucketExists(MINIO_BUCKET)) {
        await minioClient.makeBucket(MINIO_BUCKET);
        console.log(`Bucket '${MINIO_BUCKET}' was created successfully.`)
    }

    return minioClient;
}

export async function getMinioObject(name: string) {
    const minioClient = await getMinio();
    return await minioClient.getObject(MINIO_BUCKET, name);
}

export async function getMinioObjectMeta(name: string) {
    const minioClient = await getMinio();
    return await minioClient.statObject(MINIO_BUCKET, name);
}

export async function putMinioObject(objectName: string, filePath: string, owner: string, metaData?: ItemBucketMetadata) {
    const minioClient = await getMinio();
    const putResult = await minioClient.fPutObject(MINIO_BUCKET, objectName, filePath, metaData);
    // TODO: check --> await setMinioObjectTagList(objectName || "", { owner })
    return putResult;
}

export async function setMinioObjectTagList(objectName: string, tagList: TagList) {
    const minioClient = await getMinio();
    return await minioClient.setObjectTagging(MINIO_BUCKET, objectName, tagList);
}