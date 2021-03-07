"use strict";
class Item {
    constructor(name, type, description) {
        this.name = name;
        this.type = type;
        this.description = description;
        console.log(this.type);
    }
    display() {
        console.log(this.name);
    }
    save() {
        let data = JSON.stringify(this);
        localStorage.setItem(this.name, data);
    }
}
class ToDo extends Item {
    constructor(name, type, description) {
        super(name, type, description);
    }
}
class Note extends Item {
    constructor(name, type, description) {
        super(name, type, description);
    }
}
class ItemFactory {
    createItem(name, type, description) {
        switch (type) {
            case 0:
                return new ToDo(name, type, description);
                break;
            case 1:
                return new Note(name, type, description);
                break;
            default:
                return new ToDo(name, type, description);
                break;
        }
    }
}
class Main {
    constructor() {
        this.factory = new ItemFactory();
        let btn = document.getElementById("new");
        let btn2 = document.getElementById("show");
        btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", (_e) => this.createNew());
        btn2 === null || btn2 === void 0 ? void 0 : btn2.addEventListener("click", (_e) => this.show());
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
        if (test === null) {
            console.log("geen notities of todo");
        }
        else {
            let result = JSON.parse(test);
            let note = this.factory.createItem(result.name, result.type, result.description);
            note.display();
        }
    }
}
window.addEventListener("load", () => new Main());
//# sourceMappingURL=main.js.map