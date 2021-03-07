class ItemFactory {
    public createItem(name:string, type:number, description:string){
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