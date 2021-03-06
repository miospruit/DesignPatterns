class Main {
    private static instance: Main;
    static factory: ItemFactory
    ItemCollection:ItemCollection
    iterator:Iterator<Item>
    reverseIterator:Iterator<Item>


    public static getInstance(): Main{
        if(!Main.instance) {
            Main.instance = new Main();
        }

        return Main.instance;
    }

    constructor(){
        Main.factory = new ItemFactory();
        this.ItemCollection = new ItemCollection();
        this.iterator = this.ItemCollection.getIterator();
        this.reverseIterator = this.ItemCollection.getReverseIterator();
        let test = this.ItemCollection.getItems();
        console.log(test);
        
        // this.iterator = new Iterator();
        let btn = document.getElementById("new");
        let btn2 = document.getElementById("show");
        let btn4 = document.getElementById("showr");
        let btn3 = document.getElementById("clear");
        btn?.addEventListener("click", (_e:Event) => this.createNew())
        btn4?.addEventListener("click", (_e:Event) => this.showReverse())
        btn2?.addEventListener("click", (_e:Event) => this.show())
        btn3?.addEventListener("click", (_e:Event) => this.ItemCollection.clear())
    }

    createNew() {
        let item = this.createItem(this.getInput())
        console.log(item)
        this.ItemCollection.addItem(item)
    }


    show() {
        let wrapper = document.getElementById("collection");
        if (wrapper) {
            while (this.iterator.valid()) {
                let item = this.iterator.next();
                if (item.type == 0) {
                    let todo = new ToDoDecorator(item);
                    todo.createListItem();
                }
                if (item.type == 1) {
                    let note = new NoteDecorator(item);
                    note.createListItem();
                }
            }
            this.iterator.rewind();
            
        }
        console.log(this.iterator.current())
    }

    showReverse() {
        let wrapper = document.getElementById("collection");
        if (wrapper) {
            while (this.reverseIterator.valid()) {
                let item = this.reverseIterator.next();
                if (item.type == 0) {
                    let todo = new ToDoDecorator(item);
                    todo.createListItem();
                }
                if (item.type == 1) {
                    let note = new NoteDecorator(item);
                    note.createListItem();
                }
            }
            this.reverseIterator.rewind();
            
        }
    }

    createItem(item:Array<string|number>) :Item {
        return Main.factory.createItem(item[0] as string, item[1] as number, item[2] as string);
    }

    getInput() :Array<string|number> {
        let Input = [];
        let nameValue = (<HTMLInputElement>document.getElementById("name")).value;
        let typeValue = (<HTMLInputElement>document.getElementById("type")).value;
        let descriptionValue = (<HTMLInputElement>document.getElementById("description")).value;
        if (typeof nameValue === "string") {
            console.log(nameValue)
            Input.push(nameValue);
        }
        if (typeValue == "0") {
            console.log(typeValue)
            Input.push(0);
        }
        if (typeValue == "1") {
            console.log(typeValue)
            Input.push(1);
        }
        if (typeof descriptionValue === "string") {
            console.log(descriptionValue)
            Input.push(descriptionValue);
        }
        console.log(Input);
        return Input;
    }
}

window.addEventListener("load", () => new Main())
