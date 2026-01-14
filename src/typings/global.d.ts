declare global {
    interface ReviewInterface {
        review_id: number;
        content: string;
        user: string;
        rating: number;
        user_image: string;
        user_id: number;
        beer: string;
        beer_img: string
    }
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
        reviews: Array<ReviewInterface>;
        favorites: Array<BeerInterface>;
    }
    interface UserInterface {
        email: string;
        id: number;
        image: string;
        username: string;
        likes: Array;
        followeds: Array;
        followers: Array;
        reviews: Array;
        favorites: Array;
    }

    interface LoginResponseInterface {
        user: UserInterface;
        token: string;
    }
};

export {};