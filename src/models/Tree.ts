// Node class
export class Node {
  id: string;
  data: string;
  children: any[];
  level: number;

  constructor(id: string, data: any, level: number) {
    this.id = id;
    this.data = data;
    this.level = level;
    this.children = [];
  }

  add(newNode: Node) {
    this.children.push(newNode);
  }

  update(updatedNode: Node, id: string) {
    this.children = this.children.map((node: Node) => {
      return node.id === id ? updatedNode : node;
    });
  }

  remove(id: string) {
    this.children = this.children.filter((node: Node) => {
      return node.id !== id;
    });
  }
}

// Tree class
export class Tree {
  root: Node | null;
  constructor() {
    this.root = null;
  }

  traverseBF(fn: (arg0: any) => void) {
    const arr: Node[] | any = [this.root];
    while (arr.length) {
      const node = arr.shift();

      if (node && node.children) arr.push(...node.children);

      fn(node);
    }

    return arr;
  }
}
