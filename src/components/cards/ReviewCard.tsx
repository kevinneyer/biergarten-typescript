interface ReviewCardProps {
    review: ReviewInterface;
    currentUser: UserInterface | null;
    deleteReview: (e: React.MouseEvent<HTMLDivElement>, id: number) => void;
    editReview: (review: ReviewInterface) => void;

}

const ReviewCard  = ({review, currentUser, deleteReview, editReview}: ReviewCardProps) => {
    return (
        <div className="flex flex-col items-start inset-ring-2 rounded-2xl p-2.5">
            <div className='flex items-center w-full gap-2.5'>
                <img className="max-w-[50px] w-[50px] rounded-full" src={review.user_image} />
                <div className='flex flex-col items-start'>
                    <div>{review.content}</div>
                    <div>{review.rating} / 5 stars</div>
                </div>
                {review.user_id == currentUser?.id  ? 
                    <div className="ml-auto cursor-pointer flex flex-col items-start">
                        <div onClick={() => editReview(review)}>
                            Edit
                        </div>
                        <div onClick={(e) => deleteReview(e, review.review_id)}>
                            Delete
                        </div>
                    </div>
                : null}
            </div>
            <div className='mt-[5px] font-semibold'>
                {review.user}
            </div>
        </div>
    )
};

export default ReviewCard;