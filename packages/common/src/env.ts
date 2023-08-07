import dotenv from "dotenv";

const env = process.env;

if(env.NODE_ENV !== "production") {
    console.log("Non production environment - Loading .env")
    dotenv.config();
}

export const PORT:number = parseInt(env.PORT || "3000") || 3000;
export const HOSTNAME:string = env.HOSTNAME || "localhost";

export const JWT_KEY:string = env.JWT_KEY || "TO BE SET!";

export const MINIO_ACCESS_KEY:string = env.MINIO_ACCESS_KEY || "minioadmin";
export const MINIO_SECRET_KEY:string = env.MINIO_SECRET_KEY || "minioadmin";
export const MINIO_USE_SSL:boolean = env.MINIO_USE_SSL?.toLowerCase() === "true";
export const MINIO_PORT:number = parseInt(env.MINIO_PORT || "9000") || 9000;
export const MINIO_END_POINT:string = env.MINIO_END_POINT || "localhost";
export const MINIO_BUCKET:string = env.MINIO_BUCKET || "fluffy";

