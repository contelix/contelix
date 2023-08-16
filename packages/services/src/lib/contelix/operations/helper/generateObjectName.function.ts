/**
 * Generates an object name from owner, imageId and filename
 * 
 * @param {string} owner 
 * @param {string} imageId 
 * @param {string} filename 
 * @returns {string} generated object name
 */
export function generateObjectName(owner: string, imageId: string, filename: string): string {
    return `users/${owner}/${imageId}-${filename}`;
}