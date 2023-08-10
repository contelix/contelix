import { ObjectId } from "mongodb";

/**
 * Post type for Fluffy
 */
export interface FluffyPost {
    _id?: ObjectId,
    file: Express.Multer.File,
    owner: string,
    published?: boolean,
    description?: string
}