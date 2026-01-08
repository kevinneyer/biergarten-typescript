import { useState } from 'react';
import ReviewCard from './cards/ReviewCard';
import AddReview from './AddReview';
interface ReviewsProps {
    beer: BeerInterface | null;
    currentUser: UserInterface | null;
    onReviewAdded: (newReview: ReviewInterface) => void;
    onReviewDeleted: (id: number) => void;
}

const Reviews = ({beer, currentUser, onReviewAdded, onReviewDeleted}: ReviewsProps) => {
    const [contentError, setContentError] = useState<boolean>(false);
    const [ratingError, setRatingError] = useState<boolean>(false);
    const [resetForm, setResetForm] = useState<boolean>(false);

    const submitReviewHandler = (e: React.FormEvent<HTMLFormElement>, content: string, rating: string): void => {
        e.preventDefault();
        setResetForm(false);

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
            // If all fields have necessary data, submite form.
            if (content.length > 0 && rating !== "0") {
                const token = localStorage.token;
                fetch('http://localhost:3000/api/v1/reviews', {
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
                        user_id: data.user.id,
                    }
                    onReviewAdded(newReview);
                    setResetForm(true);
                })
            } else {
                return;
            }
        } else {
            alert('Something went wrong!')
        }
    };

    const deleteReviewHandler = (e: React.MouseEvent<HTMLDivElement>, id: number): void => {
        e.preventDefault();

        if (currentUser) {
            fetch(`http://localhost:3000/api/v1/reviews/${id}`, {
                method: 'DELETE',
                headers:{
                    'content-type': 'application/json'
                }
            })
            .then((res) => {
            if (res.ok) {
                    onReviewDeleted(id);
                }
            })
        }
    };

    return (
        <div className='px-2.5'>
            <div className='text-3xl font-bold'>Reviews</div>
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
            <AddReview 
                contentError={contentError}
                ratingError={ratingError}
                submitReviewForm={submitReviewHandler}
                currentUser={currentUser}
                resetForm={resetForm}
            />
        </div>
    )
};

export default Reviews;