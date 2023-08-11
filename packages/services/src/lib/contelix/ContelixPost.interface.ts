import { ObjectId } from "mongodb";

/**
 * Post type for Contelix
 */
export interface ContelixPost {
    _id?: ObjectId,
    file: Express.Multer.File,
    owner: string,
    published?: boolean,
    description?: string
}