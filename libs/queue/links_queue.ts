class LinksQueue {
  linksList: Set<string>;

  constructor() {
    this.linksList = new Set<string>();
  }

  isEmpty(): boolean {
    return this.size() == 0;
  }

  size(): number {
    return this.linksList.size;
  }

  insert(newLink: string): void {
    this.linksList.add(newLink);
  }

  pop(): string | undefined {
    for(let elem of this.linksList) {
      const url = elem;
      this.linksList.delete(url);
      return url;
    }
  }
}

export default LinksQueue;