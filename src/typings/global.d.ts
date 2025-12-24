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
        likes: [] | null;
        likes_count: number | null;
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
        likes: Array;
    }

    interface LoginResponseInterface {
        user: UserInterface;
        token: string;
    }
};

export {};