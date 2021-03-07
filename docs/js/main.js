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
    function Item(name, type, description) {
        this.name = name;
        this.type = type;
        this.description = description;
        console.log(this.type);
    }
    Item.prototype.display = function () {
        console.log(this.name);
    };
    return Item;
}());
var ToDo = (function (_super) {
    __extends(ToDo, _super);
    function ToDo(name, type, description) {
        return _super.call(this, name, type, description) || this;
    }
    return ToDo;
}(Item));
var Note = (function (_super) {
    __extends(Note, _super);
    function Note(name, type, description) {
        return _super.call(this, name, type, description) || this;
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
                    this.addItem(Main.factory.createItem(item.name, item.type, item.description));
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
var ItemFactory = (function () {
    function ItemFactory() {
    }
    ItemFactory.prototype.createItem = function (name, type, description) {
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
        var test = this.ItemCollection.getItems();
        console.log(test);
        var btn = document.getElementById("new");
        var btn2 = document.getElementById("show");
        var btn3 = document.getElementById("clear");
        btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", function (_e) { return _this.createNew(); });
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
        var item = Main.factory.createItem("test", 1, "testing2 function");
        this.ItemCollection.addItem(item);
        item.display();
    };
    Main.prototype.show = function () {
        var test = localStorage.getItem("test");
        if (test === null) {
            console.log("geen notities of todo");
        }
        else {
            var result = JSON.parse(test);
            var note = Main.factory.createItem(result.name, result.type, result.description);
            note.display();
        }
    };
    Main.prototype.createItem = function (item) {
        Main.factory.createItem(item[0], item[1], item[2]);
    };
    Main.prototype.getInput = function () {
        var _a, _b, _c;
        var Input = [];
        var nameValue = (_a = document.getElementById("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
        var typeValue = (_b = document.getElementById("type")) === null || _b === void 0 ? void 0 : _b.nodeValue;
        var descriptionValue = (_c = document.getElementById("description")) === null || _c === void 0 ? void 0 : _c.nodeValue;
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
    };
    return Main;
}());
window.addEventListener("load", function () { return new Main(); });
//# sourceMappingURL=main.js.map