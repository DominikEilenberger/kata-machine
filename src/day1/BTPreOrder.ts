function walk(curr: BinaryNode<number> | null, path: number[]): number[] {
    // 1. base case
    if (!curr) {
        return path;
    }

    // 2. recurse
    // pre
    path.push(curr.value);

    // recurse
    walk(curr.left, path);
    walk(curr.right, path);

    // post
    // nothing to do here

    return path;

}


export default function pre_order_search(head: BinaryNode<number>): number[] {
    return walk(head, []);
}