interface Iterator<T> {
   current(): T;
   next(): T;
   key(): number;
   valid(): boolean;
   rewind(): void;
}
class OrderdIterator implements Iterator<Item> {
    private collection: ItemCollection;
    private position: number = 0;
    private reverse: boolean = false;

    constructor(collection:ItemCollection, reverse:boolean = false){
        this.collection = collection;
        this.reverse = reverse;

        if (reverse) {
            this.position = collection.getCount() - 1;
        }
    }

    public rewind(){
        this.position = this.reverse ?
        this.collection.getCount() - 1 :
            0;
    }
    public current(): Item{
        return this.collection.getItems()[this.position];
    }

    public key(): number {
        return this.position;
    }

    public next(): Item {
        const item = this.collection.getItems()[this.position];
        this.position += this.reverse ? -1 : 1;
        return item;
    }

    public valid(): boolean{
        if (this.reverse) {
            return this.position >= 0;
        }
        return this.position < this.collection.getCount();
    }

}
