import { NavLink } from "react-router";

interface BeerCardProps {
    beer: BeerInterface;
}

const BeerCard = ({beer}: BeerCardProps) => {
    const calculateRating = (beer: BeerInterface) => {
        const numberOfReviews = beer.reviews.length;
        if (numberOfReviews == 0) {
            return 0;
        }

        const total = beer.reviews.reduce((accum, review) => {
            const rate = review.rating;
            return accum + rate;
        },0)

        return total / numberOfReviews;
    };

    return (
        <>
            <div className='bg-white flex flex-col text-black p-4 max-h-[400px] min-h-[400px] rounded-lg shadow-sm shadow-white'>
                <div className='mt-auto'>
                    <img className='h-48 w-96 object-contain' src={beer.img_url} />
                    <div>{beer.name}</div>
                    <div>{beer.brewery}</div>
                </div>
                    <div className='text-[12px]'>
                        <p>Likes: {beer.likes_count}</p>
                        <p>Rating: {calculateRating(beer)}</p>
                    </div>
                <div className='mt-auto'>
                    <button 
                        className='bg-blue-200 p-2 rounded-sm' 
                        type="button"
                    >
                        <NavLink
                            to={`/beers/${beer.id}`}
                            className={({ isActive }) =>
                                isActive ? "text-red-500" : "text-black"
                            }
                            >
                            See More Info
                        </NavLink>
                    </button>
                </div>
            </div>
        </>
    );
};

export default BeerCard;