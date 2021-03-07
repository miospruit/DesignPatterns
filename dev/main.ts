class Main {
    private static instance: Main;
    static factory: ItemFactory
    ItemCollection:ItemCollection

    public static getInstance(): Main{
        if(!Main.instance) {
            Main.instance = new Main();
        }

        return Main.instance;
    }

    constructor(){
        Main.factory = new ItemFactory();
        this.ItemCollection = new ItemCollection();
        // const iterator = this.ItemCollection.getIterator();
        let test = this.ItemCollection.getItems();
        console.log(test);
        
        // this.iterator = new Iterator();
        let btn = document.getElementById("new");
        let btn2 = document.getElementById("show");
        let btn3 = document.getElementById("clear");
        btn?.addEventListener("click", (_e:Event) => this.createNew())
        btn2?.addEventListener("click", (_e:Event) => this.show())
        btn3?.addEventListener("click", (_e:Event) => this.ItemCollection.clear())
    }

    createNew() {
        let item = Main.factory.createItem("test", 1, "testing2 function");
        this.ItemCollection.addItem(item)
        item.display();
    }

    show() {
        let test = localStorage.getItem("test");
        if(test === null){
            console.log("geen notities of todo")
        }else{
            let result = JSON.parse(test);
            // console.log(result, test);
            let note : Note|ToDo = Main.factory.createItem(result.name,result.type,result.description);
            note.display();
        } 
    }

    createItem(item:Array<string|number>) {
        Main.factory.createItem(item[0] as string, item[1] as number, item[2] as string);
    }

    getInput() :Array<string|number> {
        let Input = [];
        let nameValue = document.getElementById("name")?.nodeValue;
        let typeValue = document.getElementById("type")?.nodeValue;
        let descriptionValue = document.getElementById("description")?.nodeValue;
        if (typeof nameValue === "string") {
            Input.push(nameValue);
        }
        if (typeValue = "0") {
            Input.push(0);
        }
        if (typeof descriptionValue === "string") {
            Input.push(descriptionValue);
        }
        return Input;
    }
}

window.addEventListener("load", () => new Main())
