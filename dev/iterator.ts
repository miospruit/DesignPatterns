interface Iteratorinterface {
    hasNext():boolean
    next():Note|ToDo
}
class Iterator<T> implements Iteratorinterface {
    items:[];
    index:number;

    constructor(items:[], _index:number){
        this.items = items;
        this.index = 0;
    }

    hasNext():boolean {
        this.index;
        return true
    }

    next():Note|ToDo {
        return new Note("test", 1, "test");
    }
}
