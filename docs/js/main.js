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
class itemCollection {
    constructor() {
        this.getItems();
    }
    getItems() {
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key === null) {
                console.log('idiot');
            }
            else {
                let storageItem = localStorage.getItem(key);
                if (storageItem === null) {
                    console.log('idiot');
                }
                else {
                    let item = JSON.parse(storageItem);
                    this.items.push(Main.factory.createItem(item.name, item.type, item.description));
                }
            }
        }
        return this.items;
    }
    addItem(key, item) {
        let data = JSON.stringify(item);
        localStorage.setItem(key, data);
    }
    clear() {
        localStorage.clear();
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
class Iterator {
    constructor(items, _index) {
        this.items = items;
        this.index = 0;
    }
    hasNext() {
        this.index;
        return true;
    }
    next() {
        return new Note("test", 1, "test");
    }
}
class Main {
    constructor() {
        Main.factory = new ItemFactory();
        this.itemCollection = new itemCollection();
        let test = this.itemCollection.getItems();
        console.log(test);
        let btn = document.getElementById("new");
        let btn2 = document.getElementById("show");
        btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", (_e) => this.createNew());
        btn2 === null || btn2 === void 0 ? void 0 : btn2.addEventListener("click", (_e) => this.show());
    }
    static getInstance() {
        if (!Main.instance) {
            Main.instance = new Main();
        }
        return Main.instance;
    }
    createNew() {
        let item = Main.factory.createItem("test", 1, "testing2 function");
        this.itemCollection.addItem(item.name, item);
        item.display();
    }
    show() {
        let test = localStorage.getItem("test");
        if (test === null) {
            console.log("geen notities of todo");
        }
        else {
            let result = JSON.parse(test);
            let note = Main.factory.createItem(result.name, result.type, result.description);
            note.display();
        }
    }
}
window.addEventListener("load", () => new Main());
//# sourceMappingURL=main.js.map