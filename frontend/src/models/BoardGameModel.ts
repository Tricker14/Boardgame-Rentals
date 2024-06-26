class BoardGameModel {
    id: number;
    title: string;
    designer?: string;
    description?: string;
    copies?: number;
    copiesAvailable?: number;
    category?: string;
    imageURL?: string;

    constructor (id: number, title: string, designer: string, description: string, 
        copies: number, copiesAvailable: number, category: string, imageURL: string) {
            this.id = id;
            this.title = title;
            this.designer = designer;
            this.description = description;
            this.copies = copies;
            this.copiesAvailable = copiesAvailable;
            this.category = category;
            this.imageURL = imageURL;
    }
}

export default BoardGameModel;