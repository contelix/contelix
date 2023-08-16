import { Client, ClientOptions } from "minio";
import { MINIO_ACCESS_KEY, MINIO_BUCKET, MINIO_END_POINT, MINIO_PORT, MINIO_SECRET_KEY, MINIO_USE_SSL } from "../../env";

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
export async function getMinio(): Promise<Client> {
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