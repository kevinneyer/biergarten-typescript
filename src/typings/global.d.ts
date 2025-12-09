declare global {
    interface BeerInterface {
        id: number;
        brewery: string;
        name: string;
        style: string;
        abv: number;
        img_url: string;
        description: string;
        tasting_notes: string;
        likes: number | null;
        recommended_drinking: string;
        url: string;
        reviews: Array;
        favorites: Array<BeerInterface>;
    }
    interface UserInterface {
        email: string;
        id: number;
        image: string;
        username: string;
    }
};

export {};