import { ContelixError } from "./ContelixError.error";

/**
 * Default error for failures if an item was not found
 */
export class ContelixErrorItemNotFound extends ContelixError {
    constructor(id: string) {
        super(`Item for "${id}" not found`)
    }
}