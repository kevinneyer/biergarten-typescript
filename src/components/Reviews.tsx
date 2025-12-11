interface ReviewsProps {
    beer: BeerInterface | null;
}
 interface ReviewInterface {
    review_id: number;
    content: string;
    user: string;
    rating: number;
    user_image: string;
    user_id: number;
 }

const Reviews = ({beer}: ReviewsProps) => {
    return (
        <div>
            <div className='text-3xl font-bold'>Reviews</div>
            <div>
                {beer && beer.reviews.length > 0 ?
                    beer.reviews.map((review: ReviewInterface) => (
                        <div>
                            <div>
                                {review.content} by {review.user}
                            </div>
                            <div>
                                {review.rating} / 5 stars
                            </div>
                        </div>
                    ))
                :
                'No Reviews Yet!'    
            }
            </div>
        </div>
    )
};

export default Reviews;