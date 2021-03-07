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

class itemCollection {
    items:Item[]
    factory:ItemFactory
    
    constructor(){
        this.getItems();
    }

    getItems(): Array<Item> {
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
                    this.items.push(Main.factory.createItem(item.name,item.type,item.description))
                }
            }
        }
        return this.items;
    }
    
    addItem(key:string, item: Item): void{
        let data = JSON.stringify(item);
        localStorage.setItem(key, data);
    }

    public clear() {
        localStorage.clear();
    }
}