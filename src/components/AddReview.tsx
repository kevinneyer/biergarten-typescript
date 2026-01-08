import { useState } from 'react';
import type { ChangeEvent } from 'react';

interface AddReviewProps {
    contentError: boolean;
    ratingError: boolean;
    submitReviewForm: (e: React.FormEvent<HTMLFormElement>, content: string, rating: string) => void;
    currentUser: UserInterface | null;
    resetForm: boolean;
}

const AddReview = ({contentError, ratingError, submitReviewForm, currentUser, resetForm}: AddReviewProps) => {
    const [reviewContent, setReviewContent] = useState<string>('');
    const [reviewRating, setReviewRating] = useState<string>('0');
    
    const reviewHandler = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        setReviewContent(e.target.value);
    };

    const ratingHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setReviewRating(e.target.value);
    };

    return (
        <div>
            {currentUser ? 
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
            :
                null
            }
        </div>
    )
};

export default AddReview;