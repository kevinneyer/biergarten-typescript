import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { ClipLoader } from 'react-spinners';

interface AddReviewProps {
    contentError: boolean;
    ratingError: boolean;
    submitReviewForm: (e: React.FormEvent<HTMLFormElement>, content: string, rating: string) => void;
    currentUser: UserInterface | null;
}

const AddReview = ({contentError, ratingError, submitReviewForm, currentUser}: AddReviewProps) => {
    const [reviewContent, setReviewContent] = useState<string>('');
    const [reviewRating, setReviewRating] = useState<string>('0');
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    
    const reviewHandler = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        setReviewContent(e.target.value);
    };

    const ratingHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setReviewRating(e.target.value);
    };

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        setIsProcessing(true);
        submitReviewForm(e, reviewContent, reviewRating)
    }

    return (
        <div>
            {currentUser ? 
            <div className='relative'>
                <div className='absolute top-[40%] left-[45%]'>{isProcessing ? <ClipLoader size='50px'/> : null}</div>
                <div>
                    <div className='text-3xl font-bold mt-[30px]'>
                        Add a Review
                    </div>
                    <form 
                        onSubmit={(e) => submitHandler(e)}
                        className='flex flex-col items-center'
                    >
                        <textarea 
                            className="mt-2.5 p-[15px] w-full h-[250px] max-h-[250px] bg-white text-black rounded-md"
                            value={reviewContent}
                            onChange={reviewHandler}
                        />
                        {contentError ? <p className="text-red-600">Review content cannot be empty</p> : null}
                        <div className='flex items-center'>
                            <input type="range" min="0" max="5" value={reviewRating} onChange={ratingHandler}/>
                            <div>{reviewRating} / 5 stars</div>
                        </div>
                        {ratingError ? <p className="text-red-600">Rating cannot be 0</p> : null}
                        {!isProcessing ? 
                            <button 
                                className='cursor-pointer mt-2.5 p-2.5 outline outline-offset-2 rounded-md hover:bg-blue-400 duration-300 ease-in-out' 
                                type="submit"
                            >
                                Submit Review
                            </button>
                        : null}
                    </form>
                </div>
            </div>
            :
                null
                
            }
        </div>
    )
};

export default AddReview;