import ReviewCard from "./cards/ReviewCard";
import AddReview from "./AddReview";
interface ReviewsProps {
    beer: BeerInterface | null;
}

const Reviews = ({beer}: ReviewsProps) => {
    return (
        <div>
            <div className='text-3xl font-bold'>Reviews</div>
            <div className='flex flex-col p-4 gap-6'>
                {beer && beer.reviews.length > 0 ?
                    beer.reviews.map((review, index) => (
                        <ReviewCard review={review} key={index} />
                    ))
                :
                'No Reviews Yet!'    
                }
            </div>
            <AddReview beer={beer} />
        </div>
    )
};

export default Reviews;