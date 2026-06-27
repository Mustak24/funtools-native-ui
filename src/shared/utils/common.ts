export function randomUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
    
export function syncTry<T>(fn: () => T): [T | null, Error | null] {
    try {
        const result = fn();
        return [result, null];
    } catch (error) {
        return [null, Error(error instanceof Error ? error.message : String(error))];
    }
}

export async function asyncTry<T>(fn: () => Promise<T>): Promise<[T | null, Error | null]> {
    try {
        const result = await fn();
        return [result, null];
    } catch (error) {
        return [null, Error(error instanceof Error ? error.message : String(error))];
    }
}