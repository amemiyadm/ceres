class Fauna {
    constructor() {
        this.children = {};
        this.items = new Set();
    }
}

export class Ceres {
    constructor(data) {
        this.root = new Fauna();

        for (const item of data) {
            for (const word of item.keywords) {
                this.insert(word, item);
            }
        }
    }

    insert(word, item) {
        let node = this.root;

        for (const char of word) {
            if (!node.children[char]) {
                node.children[char] = new Fauna();
            }

            node = node.children[char];
            node.items.add(item);
        }
    }

    search(query, limit = Infinity) {
        if (!query) return [];

        let node = this.root;

        for (const char of query) {
            if (!node.children[char]) return [];

            node = node.children[char];
        }

        const results = [];

        for (const item of node.items) {
            results.push(item);

            if (results.length === limit) break;
        }

        return Array.from(results);
    }
}
