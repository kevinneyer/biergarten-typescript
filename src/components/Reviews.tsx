import { useState } from 'react';
import ReviewCard from './cards/ReviewCard';
import AddReview from './AddReview';
import { API_URL } from '../config.ts';
interface ReviewsProps {
    beer: BeerInterface | null;
    currentUser: UserInterface | null;
    onReviewAdded: (newReview: ReviewInterface) => void;
    deleteReview: (e: React.MouseEvent<HTMLDivElement>, id: number) => void;
}

const Reviews = ({beer, currentUser, onReviewAdded, deleteReview}: ReviewsProps) => {
    const [contentError, setContentError] = useState<boolean>(false);
    const [ratingError, setRatingError] = useState<boolean>(false);
    const [showAddReviews, setShowAddReviews] = useState<boolean>(false);
    const [formKey, setFormKey] = useState<number>(0);

    const submitReviewHandler = (e: React.FormEvent<HTMLFormElement>, content: string, rating: string): void => {
        e.preventDefault();

        // A non logged in user should never be able to access this form, but this is here as a fail safe.
        if (!currentUser) {
            alert('You need to be logged in to leave a review');
            return;
        }

        // Prevent sending bad data to DB by checking for beer.
        if (
            beer
        ) {
            setContentError(!content);
            setRatingError(rating == '0');
            // If all fields have necessary data, submit form.
            if (content.length > 0 && rating !== "0") {
                const token = localStorage.token;
                fetch(`${API_URL}/reviews`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        accepts: 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify({ 
                        content: content,
                        beer: {
                            beer_id: beer.id,
                            beer_name: beer.name
                        },
                        rating: rating
                    })
                })
                .then(res => res.json())
                .then(data => {
                    const newReview: ReviewInterface = {
                        review_id: data.id,
                        content: data.content,
                        user: data.user.user_name,
                        rating: data.rating,
                        user_image: data.user.user_image,
                        user_id: data.user.user_id,
                        beer: beer.name,
                        beer_img: beer.img_url
                    }
                    onReviewAdded(newReview);
                    setFormKey(prev => prev + 1);
                })
            } else {
                return;
            }
        } else {
            alert('Something went wrong!');
        }
    };

    const deleteReviewHandler = (e: React.MouseEvent<HTMLDivElement>, id: number): void => {
        deleteReview(e, id)
    };

    return (
        <div className='px-2.5'>
            <div className='relative'>
                <div className='text-3xl font-bold text-center'>Reviews</div>
                {currentUser ? 
                    <div className='absolute left-[80%] top-0'>
                        <button 
                            className=' w-max text-white bg-black p-2 border-2 border-black rounded-md  hover:bg-transparent hover:text-white transition-all ease-in-out cursor-pointer' 
                            type="button"
                            onClick={() => setShowAddReviews(!showAddReviews)}
                        >
                            {showAddReviews ? 'Hide' : 'Add Review'}
                        </button>
                    </div>
                : null}
            </div>
            <div className='flex flex-col p-4 gap-6'>
                {beer && beer.reviews.length > 0 ?
                    beer.reviews.map((review, index) => (
                        <ReviewCard 
                            review={review} 
                            key={index} 
                            currentUser={currentUser}
                            deleteReview={deleteReviewHandler}
                        />
                    ))
                :
                'No Reviews Yet!'    
                }
            </div>
            {showAddReviews ? 
                <AddReview
                    key={formKey} 
                    contentError={contentError}
                    ratingError={ratingError}
                    submitReviewForm={submitReviewHandler}
                    currentUser={currentUser}
                />
            : null}
        </div>
    )
};

export default Reviews;