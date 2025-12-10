interface ReviewsProps {
    beer: BeerInterface | null;
}

const Reviews = ({beer}: ReviewsProps) => {
    return (
        <div>
            <div className='text-3xl font-bold'>Reviews</div>
            <div>
                {beer?.reviews.length > 0 ?
                'map reviews'
                :
                'No Reviews Yet!'    
            }
            </div>
        </div>
    )
};

export default Reviews;