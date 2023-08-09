import {ObjectId} from "mongodb"

export interface Image {
    _id?: ObjectId
    filename: string,
    owner: string
    size: number,
    mimeType: string,
    isPublished: boolean,
    description?: string,
}