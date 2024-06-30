class BoardGameModel {
    id: number;
    name: string;
    designer?: string;
    description?: string;
    copies?: number;
    copiesAvailable?: number;
    category?: string;
    imageURL?: string;

    constructor (id: number, name: string, designer: string, description: string, 
        copies: number, copiesAvailable: number, category: string, imageURL: string) {
            this.id = id;
            this.name = name;
            this.designer = designer;
            this.description = description;
            this.copies = copies;
            this.copiesAvailable = copiesAvailable;
            this.category = category;
            this.imageURL = imageURL;
    }
}

export default BoardGameModel;