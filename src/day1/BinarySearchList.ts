export default function bs_list(haystack: number[], needle: number): boolean {
    let low = 0;
    let high = haystack.length

    while (low < high) {
        let mid = Math.floor(low + (high - low) / 2)
        let value = haystack[mid]

        if (value === needle) {
            return true
        }
        else if (needle < value) {
            high = mid - 1
        } else {
            low = mid + 1
        }
    }
    return false;
}