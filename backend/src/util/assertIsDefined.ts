export function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
    if(!val) {
        throw Error("Expected 'val' to be received, but received "+val)
    }
}
