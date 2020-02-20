export default {
    methods: {
        isObjectEmpty(obj) {
            if (obj === undefined) {
                throw new Error(`obj is undefined`)
            }

            return Object.entries(obj).length === 0 && obj.constructor === Object
        },
        isArrayEmpty(arr) {
            return arr === undefined || arr.length === 0
        },
        isUndefined(t) {
            return typeof t === 'undefined'
        }
    }
}