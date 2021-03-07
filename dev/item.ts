abstract class Item {
    name: string;
    type: number;
    description: string;
    
    public constructor(name:string, type:number, description:string) {
        this.name = name;
        this.type = type;
        this.description = description;
        console.log(this.type);
    }

    public display(): void{
        console.log(this.name);
    }

    public save(): void {
        let data = JSON.stringify(this);
        localStorage.setItem(this.name, data);
    }
}

class ToDo extends Item {
    
    public constructor(name:string, type:number, description:string){
        super(name, type, description);
    }
}

class Note extends Item {
    
    public constructor(name:string, type:number, description:string){
        super(name, type, description);
    }
}