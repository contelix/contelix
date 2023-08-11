const env = process.env;

// Services configuration
export const PORT: number = parseInt(env.PORT || "3000") || 3000;
export const HOSTNAME: string = env.HOSTNAME || "localhost";
export const CACHE_MULTER:string = env.FILE_CACHE || "./cache/multer"
export const JWT_KEY: string = env.JWT_KEY || "TO BE SET!";

// Min.io configurtation
export const MINIO_ACCESS_KEY: string = env.MINIO_ACCESS_KEY || "minioadmin";
export const MINIO_SECRET_KEY: string = env.MINIO_SECRET_KEY || "minioadmin";
export const MINIO_USE_SSL: boolean = env.MINIO_USE_SSL?.toLowerCase() === "true";
export const MINIO_PORT: number = parseInt(env.MINIO_PORT || "9000") || 9000;
export const MINIO_END_POINT: string = env.MINIO_END_POINT || "localhost";
export const MINIO_BUCKET: string = env.MINIO_BUCKET || "fluffy";

// Mongo configuration
export const MONGO_USER: string = env.MONGO_USER || "mongoUser";
export const MONGO_PASSWORD: string = env.MONGO_PASSWORD || "mongoPass";
export const MONGO_CONNECTION_STRING: string = env.MONGO_CONNECTION_STRING || `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@localhost:27017`;
export const MONGO_DATABASE_NAME: string = env.MONGO_DATABASE_NAME || "fluffy";
export const MONGO_IMAGES_COLLECTION_NAME: string = env.MONGO_COLLECTION_NAME || "images";

