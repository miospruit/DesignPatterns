abstract class Item {
    name: string;
    type: number;
    description: string;
    done: boolean;
    
    public constructor(name:string, type:number, description:string, done:boolean) {
        this.name = name;
        this.type = type;
        this.description = description;
        this.done = done;
        console.log(this.type);
    }

    public display(): void{
        console.log(this.name);
    }

    public createListItem(item:Item) {
        let wrapper = document.getElementById("collection")
        if (wrapper === null) {
            console.log("wrapper not found");
        }
        if (wrapper) {
            wrapper.innerHTML += `
            <li>
                <p>
                    <label>
                        <input type="checkbox" />
                        <span>${this.name}:</span>
                        <span>${this.description}</span>
                    </label>
                </p>
            </li>`
        }
    }
}

class ToDo extends Item {
    
    public constructor(name:string, type:number, description:string, done:boolean){
        super(name, type, description, done);
    }




}

class Note extends Item {
    
    public constructor(name:string, type:number, description:string, done:boolean){
        super(name, type, description, done);
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
                    this.addItem(Main.factory.createItem(item.name,item.type,item.description, item.done))
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