type QNode<T> = {
    value: T,
    next?: QNode<T>
    prev?: QNode<T>
}

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: QNode<T>;
    private tail?: QNode<T>;

    constructor() {
        this.head = undefined;
        this.length = 0;
    }

    prepend(item: T): void {
        const node = { value: item } as QNode<T>;

        this.length++;
        if (!this.head) {
            this.head = node;
            return;
        }

        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }

    insertAt(item: T, idx: number): void {
        if (idx > this.length) {
            throw new Error('oh no');
        }
        this.length++;
        if (idx === this.length) {
            this.append(item);
            return;
        } else if (idx === 0) {
            this.prepend(item);
            return;
        }

        const curr = this.getAt(idx) as QNode<T>;
        const node = { value: item } as QNode<T>;

        node.next = curr;
        node.prev = curr.prev;
        curr.prev = node;
        if (node.prev) {
            node.prev.next = curr;
        }
    }

    append(item: T): void {
        this.length++;
        const node = { value: item } as QNode<T>;

        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }

        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
    }

    remove(item: T): T | undefined {
        let curr = this.head;
        for (let i = 0; curr && i < this.length; i++) {
            if (curr.value === item) {
                break;
            }
            curr = curr.next;
        }

        if (!curr) {
            return undefined;
        }

        return this.removeNode(curr);
    }

    get(idx: number): T | undefined {
        return this.getAt(idx)?.value;
    }

    removeAt(idx: number): T | undefined {
        const node = this.getAt(idx);
        if (!node) {
            return undefined;
        }
        return this.removeNode(node);
    }

    private removeNode(node: QNode<T>): T | undefined {
        this.length--;

        if (this.length === 0) {
            const out = this.head?.value
            this.head = this.tail = undefined;
            return out;
        }

        if (node.prev) {
            node.prev.next = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        }

        if (node === this.head) {
            this.head = node.next;
        }

        if (node === this.tail) {
            this.tail = node.prev;
        }

        node.prev = node.next = undefined;
        return node.value;

    }

    private getAt(idx: number): QNode<T> | undefined {
        let curr = this.head;
        for (let i = 0; curr && i < idx; i++) {
            curr = curr.next;
        }
        return curr;
    }
}