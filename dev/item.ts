abstract class Item {
    name: string;
    type: number;
    description: string;
    
    public constructor(name:string, type:number, description:string) {
        this.name = name;
        this.type = type;
        this.description = description;
        console.log(this.type);
    }

    public display(): void{
        console.log(this.name);
    }
}

class ToDo extends Item {
    
    public constructor(name:string, type:number, description:string){
        super(name, type, description);
    }
}

class Note extends Item {
    
    public constructor(name:string, type:number, description:string){
        super(name, type, description);
    }
}

class ItemCollection implements Aggregator {
    private items:Item[] = []
    factory:ItemFactory
    
    constructor(){
        this.setItemCollection();
    }

    getItems(): Array<Item> {
        return this.items;
    }

    getCount(): number{
        return this.items.length;
    }

    public addItem(item:Item): void{
        this.storeItem(item.name, item);
        this.items.push(item);
    }

    setItemCollection() {
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key === null) {
                console.log('idiot')
            }else{
                let storageItem = localStorage.getItem(key)
                if(storageItem === null){
                console.log('idiot')
                }else{
                    let item = JSON.parse(storageItem)
                    this.addItem(Main.factory.createItem(item.name,item.type,item.description))
                }
            }
        }
    }
    
    storeItem(key:string, item: Item): void{
        let data = JSON.stringify(item);
        localStorage.setItem(key, data);
    }

    public getIterator(): Iterator<Item> {
        return new OrderdIterator(this);
    }

    public getReverseIterator(): Iterator<Item> {
        return new OrderdIterator(this, true);
    }

    public clear() {
        localStorage.clear();
    }
}