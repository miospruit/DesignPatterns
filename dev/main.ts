class Main {
    factory: ItemFactory

    constructor(){
        this.factory = new ItemFactory();
        let btn = document.getElementById("new");
        let btn2 = document.getElementById("show");
        btn?.addEventListener("click", (_e:Event) => this.createNew())
        btn2?.addEventListener("click", (_e:Event) => this.show())
    }

    createNew() {
        let item = this.factory.createItem("test", 1, "testing function");
        console.log(this.factory);
        item.save();
        item.display();
        this.show();
    }

    show() {
        let test = localStorage.getItem("test");
        if(test === null){
            console.log("geen notities of todo")
        }else{
            let result = JSON.parse(test);
            // console.log(result, test);
            let note : Note|ToDo = this.factory.createItem(result.name,result.type,result.description);
            note.display();
        } 
    }
}

window.addEventListener("load", () => new Main())
