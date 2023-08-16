import { ContelixPost } from "./ContelixPost.interface";
import type { Readable as ReadableStream } from 'node:stream'

export interface ContelixPostWrapper {
    post: ContelixPost,
    stream: ReadableStream
}