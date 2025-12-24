import { useState, ChangeEvent } from "react";

interface AddReviewProps {
    beer: BeerInterface | null;
}

const AddReview = ({beer}: AddReviewProps) => {
    const [reviewContent, setReviewContent] = useState<string>("");
    const [reviewRating, setReviewRating] = useState<number | string>(0);
    const [contentError, setContentError] = useState<boolean>(false);
    const [ratingError, setRatingError] = useState<boolean>(false);

    const reviewHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setReviewContent(e.target.value);

        if (contentError && reviewContent.length > 0) {
            setContentError(false);
        }
    };

    const ratingHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setReviewRating(e.target.value);

        if (ratingError && reviewRating > "0") {
            setRatingError(false);
        }
    };

    const submitReviewHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (reviewContent.length == 0) {
            setContentError(true);
            return;
        }

        if (reviewRating == 0) {
            setRatingError(true);
            return;
        }

        fetch('http://localhost:3000/api/v1/reviews')
    };
    return (
        <div>
            <div className='text-3xl font-bold mt-[30px]'>
                Add a Review
            </div>
            <form onSubmit={submitReviewHandler}>
                <textarea 
                    className="mt-2.5 p-[15px] w-full min-h-[300px] bg-white text-black"
                    onChange={reviewHandler}
                />
                {contentError ? <p className="text-red-600">Review content cannot be empty</p> : null}
                <div className='w-full'>
                    <input type="range" min="0" max="5" value={reviewRating} onChange={ratingHandler}/>
                    {reviewRating} / 5 stars
                </div>
                {ratingError ? <p className="text-red-600">Rating cannot be 0</p> : null}
                <button type="submit">Submit Review</button>
            </form>
        </div>
    )
};

export default AddReview;