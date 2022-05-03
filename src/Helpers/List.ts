class List<T extends { id: Common.Id }> {
  private list: T[];

  constructor(list: T[]) {
    this.list = list;
  }

  remove(id: Common.Id) {
    return this.list.filter((item) => item.id !== id);
  }

  find(id: Common.Id) {
    return this.list.find((item) => item.id === id);
  }

  index(id: Common.Id) {
    const index = this.list.findIndex((item) => item.id === id);

    if (index > -1) {
      return index;
    }

    return false;
  }
}

export default List;
