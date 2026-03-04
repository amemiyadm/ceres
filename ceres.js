export class Ceres {
    static buildTrie(root, data) {
        for (const item of data) {
            for (const alias of item.aliases) {
                this.insert(root, alias, item);
            }
        }
    }

    static insert(root, word, item) {
        let node = root;
        for (const char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
            node.items.add(item);
        }
    }

    static search(root, query, limit) {
        if (!query) return [];

        let node = root;
        for (const char of query) {
            if (!node.children[char]) {
                return [];
            }
            node = node.children[char];
        }

        const results = [];
        for (const item of node.items) {
            results.push(item);
            if (results.length === limit) break;
        }

        return Array.from(results);
    }

    constructor() {
        this.children = {};
        this.items = new Set();
    }
}
