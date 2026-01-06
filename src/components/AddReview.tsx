import { useState } from "react";
import type { Dispatch, SetStateAction, ChangeEvent } from 'react';

interface AddReviewProps {
    contentError: boolean;
    ratingError: boolean;
    submitReviewForm: (e: React.FormEvent<HTMLFormElement>, content: string, rating: string) => void;
    setContentError: Dispatch<SetStateAction<boolean>>;
    setRatingError: Dispatch<SetStateAction<boolean>>;
}

const AddReview = ({contentError, ratingError, submitReviewForm, setContentError, setRatingError}: AddReviewProps) => {
    const [reviewContent, setReviewContent] = useState<string>("");
    const [reviewRating, setReviewRating] = useState<string>("0");

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

    return (
        <div>
            <div className='text-3xl font-bold mt-[30px]'>
                Add a Review
            </div>
            <form 
                onSubmit={(e) => submitReviewForm(e, reviewContent, reviewRating)}
                className='flex flex-col items-center'
            >
                <textarea 
                    className="mt-2.5 p-[15px] w-full min-h-[300px] bg-white text-black rounded-md"
                    onChange={reviewHandler}
                />
                {contentError ? <p className="text-red-600">Review content cannot be empty</p> : null}
                <div className='flex items-center'>
                    <input type="range" min="0" max="5" value={reviewRating} onChange={ratingHandler}/>
                    <div>{reviewRating} / 5 stars</div>
                </div>
                {ratingError ? <p className="text-red-600">Rating cannot be 0</p> : null}
                <button className='cursor-pointer mt-2.5 p-2.5 outline outline-offset-2 rounded-md hover:bg-blue-400 duration-300 ease-in-out' type="submit">Submit Review</button>
            </form>
        </div>
    )
};

export default AddReview;