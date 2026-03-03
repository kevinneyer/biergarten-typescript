import { NavLink } from 'react-router';

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

        return (total / numberOfReviews).toFixed(1);
    };

    return (
        <>
            <div className='bg-white flex flex-col text-black p-4 max-h-[450px] min-h-[450px] rounded-lg shadow-sm shadow-white'>
                <div className='mt-auto'>
                    <img className='h-48 w-96 object-contain' src={beer.img_url} />
                    <div>{beer.name}</div>
                    <div>{beer.brewery}</div>
                    <div className='text-[14px]'>ABV: {beer.abv}%</div>
                </div>
                    <div className='text-[13px] mt-[5px]'>
                        <p>Likes: {beer.likes_count}</p>
                        <p>Reviews: {beer.reviews?.length}</p>
                        <p>Rating: {calculateRating(beer)}</p>
                    </div>
                <div className='mt-auto cursor-pointer'>
                    <button 
                        className='bg-transparent text-black p-2 border-2 border-black rounded-md  hover:bg-black hover:text-white transition-all ease-in-out cursor-pointer' 
                        type="button"
                    >
                        <NavLink 
                            to={`/beers/${beer.id}`}
                            className='font-semibold'
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