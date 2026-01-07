interface ReviewInterface {
    review_id: number;
    content: string;
    user: string;
    rating: number;
    user_image: string;
    user_id: number;
 }

interface ReviewCardProps {
    review: ReviewInterface
}

const ReviewCard  = ({review}: ReviewCardProps) => {
    return (
        <div className="flex flex-col items-start border-amber-400 inset-ring-2 rounded-2xl p-2.5">
            <div className='flex items-center gap-2.5'>
                <img className="max-w-[75px] w-[75px] rounded-full" src={review.user_image} />
                <div className='flex flex-col items-start'>
                    <div>{review.content}</div>
                    <div>{review.rating} / 5 stars</div>
                </div>
            </div>
            <div className='mt-[5px]'>
                by {review.user}
            </div>
        </div>
    )
};

export default ReviewCard;