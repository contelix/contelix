import { FluffyErrorItemNotFound } from "../errors";
import { getMinioObject, putMinioObject } from "../minio";
import { Image } from "./Image.interface";
import { addMongoImage, findMongoImage } from "../mongo/mongo";
import type { Readable as ReadableStream } from 'node:stream'

export interface FluffyImage {
    image: Image,
    stream: ReadableStream
}

function generateObjectName(owner: string, imageId: string, filename: string): string {
    return `users/${owner}/${imageId}-${filename}`;
}

export async function getFluffyImage(id: string): Promise<FluffyImage> {
    const image = await findMongoImage(id);
    if (image === null) {
        throw new FluffyErrorItemNotFound(`Not item found for: ${id}`);
    }
    const objectName = generateObjectName(image.owner, image._id?.toString() || "", image.filename);

    return {
        image: image,
        stream: await getMinioObject(objectName)
    }
}

export async function addFluffyImage(filePath: string, image: Image): Promise<string> {
    const imageId = await addMongoImage(image);
    await putMinioObject(
        generateObjectName(image.owner, imageId, image.filename),
        filePath,
        image.owner,
        {
            "content-type": image.mimeType
        }
    );
    return imageId;
}