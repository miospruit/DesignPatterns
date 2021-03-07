class ItemFactory {
    public createItem(name:string, type:number, description:string, done:boolean){
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
    }
}