class Decorator implements Item {
    name: string;
    type: number;
    description: string;
    protected component: Item

    public display(): void {
        throw new Error("Method not implemented.");
    }

    constructor(component:Item) {
        this.component = component;
    }

    public createListItem(item:Item) {
        return this.component.createListItem(item);
    }
}

class NoteDecorator extends Decorator {
    public createListItem(item:Item) {
        
        let wrapper = document.getElementById("collection")
        if (wrapper === null) {
            console.log("wrapper not found");
        }
        if (wrapper) {
            wrapper.innerHTML += `
            <li class="collection-item">
                <p>
                    <label>
                        <span>${item.name}:</span>
                        <span>${item.description}</span>
                    </label>
                </p>
            </li>`
        }
    }
}

class ToDoDecorator extends Decorator {
    public createListItem(item:Item) {
        
        let wrapper = document.getElementById("collection")
        if (wrapper === null) {
            console.log("wrapper not found");
        }
        if (wrapper) {
            wrapper.innerHTML += `
            <li class="collection-item">
                <p>
                    <label>
                        <input type="checkbox" />
                        <span>${item.name}:</span>
                        <span>${item.description}</span>
                    </label>
                </p>
            </li>`
        }
    }
}