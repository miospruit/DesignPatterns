class Decorator implements Item {
    done: boolean;
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

    public createListItem() {
        // return this.component.createListItem(item:);
    }
    
}