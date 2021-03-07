"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Item = (function () {
    function Item(name, type, description, done) {
        this.name = name;
        this.type = type;
        this.description = description;
        this.done = done;
        console.log(this.type);
    }
    Item.prototype.display = function () {
        console.log(this.name);
    };
    Item.prototype.createListItem = function (item) {
        var wrapper = document.getElementById("collection");
        if (wrapper === null) {
            console.log("wrapper not found");
        }
        if (wrapper) {
            wrapper.innerHTML += "\n            <li>\n                <p>\n                    <label>\n                        <input type=\"checkbox\" />\n                        <span>" + this.name + ":</span>\n                        <span>" + this.description + "</span>\n                    </label>\n                </p>\n            </li>";
        }
    };
    return Item;
}());
var ToDo = (function (_super) {
    __extends(ToDo, _super);
    function ToDo(name, type, description, done) {
        return _super.call(this, name, type, description, done) || this;
    }
    return ToDo;
}(Item));
var Note = (function (_super) {
    __extends(Note, _super);
    function Note(name, type, description, done) {
        return _super.call(this, name, type, description, done) || this;
    }
    return Note;
}(Item));
var ItemCollection = (function () {
    function ItemCollection() {
        this.items = [];
        this.setItemCollection();
    }
    ItemCollection.prototype.getItems = function () {
        return this.items;
    };
    ItemCollection.prototype.getCount = function () {
        return this.items.length;
    };
    ItemCollection.prototype.addItem = function (item) {
        this.storeItem(item.name, item);
        this.items.push(item);
    };
    ItemCollection.prototype.setItemCollection = function () {
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (key === null) {
                console.log('idiot');
            }
            else {
                var storageItem = localStorage.getItem(key);
                if (storageItem === null) {
                    console.log('idiot');
                }
                else {
                    var item = JSON.parse(storageItem);
                    this.addItem(Main.factory.createItem(item.name, item.type, item.description, item.done));
                }
            }
        }
    };
    ItemCollection.prototype.storeItem = function (key, item) {
        var data = JSON.stringify(item);
        localStorage.setItem(key, data);
    };
    ItemCollection.prototype.getIterator = function () {
        return new OrderdIterator(this);
    };
    ItemCollection.prototype.getReverseIterator = function () {
        return new OrderdIterator(this, true);
    };
    ItemCollection.prototype.clear = function () {
        localStorage.clear();
    };
    return ItemCollection;
}());
var Decorator = (function () {
    function Decorator(component) {
        this.component = component;
    }
    Decorator.prototype.display = function () {
        throw new Error("Method not implemented.");
    };
    Decorator.prototype.createListItem = function () {
    };
    return Decorator;
}());
var ItemFactory = (function () {
    function ItemFactory() {
    }
    ItemFactory.prototype.createItem = function (name, type, description, done) {
        switch (type) {
            case 0:
                return new ToDo(name, type, description, done);
                break;
            case 1:
                return new Note(name, type, description, done);
                break;
            default:
                return new ToDo(name, type, description, done);
                break;
        }
    };
    return ItemFactory;
}());
var OrderdIterator = (function () {
    function OrderdIterator(collection, reverse) {
        if (reverse === void 0) { reverse = false; }
        this.position = 0;
        this.reverse = false;
        this.collection = collection;
        this.reverse = reverse;
        if (reverse) {
            this.position = collection.getCount() - 1;
        }
    }
    OrderdIterator.prototype.rewind = function () {
        this.position = this.reverse ?
            this.collection.getCount() - 1 :
            0;
    };
    OrderdIterator.prototype.current = function () {
        return this.collection.getItems()[this.position];
    };
    OrderdIterator.prototype.key = function () {
        return this.position;
    };
    OrderdIterator.prototype.next = function () {
        var item = this.collection.getItems()[this.position];
        this.position += this.reverse ? -1 : 1;
        return item;
    };
    OrderdIterator.prototype.valid = function () {
        if (this.reverse) {
            return this.position >= 0;
        }
        return this.position < this.collection.getCount();
    };
    return OrderdIterator;
}());
var Main = (function () {
    function Main() {
        var _this = this;
        Main.factory = new ItemFactory();
        this.ItemCollection = new ItemCollection();
        this.iterator = this.ItemCollection.getIterator();
        this.reverseIterator = this.ItemCollection.getReverseIterator();
        var test = this.ItemCollection.getItems();
        console.log(test);
        var btn = document.getElementById("new");
        var btn2 = document.getElementById("show");
        var btn4 = document.getElementById("showr");
        var btn3 = document.getElementById("clear");
        btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", function (_e) { return _this.createNew(); });
        btn4 === null || btn4 === void 0 ? void 0 : btn4.addEventListener("click", function (_e) { return _this.showReverse(); });
        btn2 === null || btn2 === void 0 ? void 0 : btn2.addEventListener("click", function (_e) { return _this.show(); });
        btn3 === null || btn3 === void 0 ? void 0 : btn3.addEventListener("click", function (_e) { return _this.ItemCollection.clear(); });
    }
    Main.getInstance = function () {
        if (!Main.instance) {
            Main.instance = new Main();
        }
        return Main.instance;
    };
    Main.prototype.createNew = function () {
        var item = this.createItem(this.getInput());
        console.log(item);
        this.ItemCollection.addItem(item);
    };
    Main.prototype.show = function () {
        while (this.iterator.valid()) {
            this.iterator.next().createListItem(this.iterator.next());
        }
        this.iterator.rewind();
    };
    Main.prototype.showReverse = function () {
        while (this.reverseIterator.valid()) {
            this.iterator.next().createListItem(this.iterator.next());
        }
        this.reverseIterator.rewind();
    };
    Main.prototype.createItem = function (item) {
        return Main.factory.createItem(item[0], item[1], item[2], false);
    };
    Main.prototype.getInput = function () {
        var Input = [];
        var nameValue = document.getElementById("name").value;
        var typeValue = document.getElementById("type").value;
        var descriptionValue = document.getElementById("description").value;
        if (typeof nameValue === "string") {
            console.log(nameValue);
            Input.push(nameValue);
        }
        if (typeValue = "0") {
            console.log(typeValue);
            Input.push(0);
        }
        if (typeof descriptionValue === "string") {
            console.log(descriptionValue);
            Input.push(descriptionValue);
        }
        return Input;
    };
    return Main;
}());
window.addEventListener("load", function () { return new Main(); });
//# sourceMappingURL=main.js.map