class Main {
    private static instance: Main;
    static factory: ItemFactory
    iterator: Iterator<Item>
    itemCollection:itemCollection

    public static getInstance(): Main{
        if(!Main.instance) {
            Main.instance = new Main();
        }

        return Main.instance;
    }

    constructor(){
        Main.factory = new ItemFactory();
        this.itemCollection = new itemCollection();
        let test = this.itemCollection.getItems();
        console.log(test);
        
        // this.iterator = new Iterator();
        let btn = document.getElementById("new");
        let btn2 = document.getElementById("show");
        let btn3 = document.getElementById("clear");
        btn?.addEventListener("click", (_e:Event) => this.createNew())
        btn2?.addEventListener("click", (_e:Event) => this.show())
        btn3?.addEventListener("click", (_e:Event) => this.itemCollection.clear())
    }

    createNew() {
        let item = Main.factory.createItem("test", 1, "testing2 function");
        this.itemCollection.addItem(item.name, item)
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
}

window.addEventListener("load", () => new Main())
