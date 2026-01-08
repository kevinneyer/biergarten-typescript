interface ReviewCardProps {
    review: ReviewInterface;
    currentUser: UserInterface | null;
    deleteReview: (e: React.MouseEvent<HTMLDivElement>, id: number) => void;

}

const ReviewCard  = ({review, currentUser, deleteReview}: ReviewCardProps) => {
    return (
        <div className="flex flex-col items-start border-amber-400 inset-ring-2 rounded-2xl p-2.5">
            <div className='flex items-center w-full gap-2.5'>
                <img className="max-w-[75px] w-[75px] rounded-full" src={review.user_image} />
                <div className='flex flex-col items-start'>
                    <div>{review.content}</div>
                    <div>{review.rating} / 5 stars</div>
                </div>
                <div className="ml-auto cursor-pointer" onClick={(e) => deleteReview(e, review.review_id)}>
                    {review.user_id == currentUser?.id ? 'Delete' : null}
                </div>
            </div>
            <div className='mt-[5px]'>
                by {review.user}
            </div>
        </div>
    )
};

export default ReviewCard;