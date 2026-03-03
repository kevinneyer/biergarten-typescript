import { useState, useEffect } from 'react';
import ReviewCard from './cards/ReviewCard';
import AddReview from './AddReview';
import Modal from 'react-modal';
import { API_URL } from '../config.ts';

interface ReviewsProps {
    beer: BeerInterface | null;
    currentUser: UserInterface | null;
    onReviewAdded: (newReview: ReviewInterface) => void;
    onReviewUpdated: (review: ReviewInterface) => void;
    deleteReview: (e: React.MouseEvent<HTMLDivElement>, id: number) => void;
}

const Reviews = ({beer, currentUser, onReviewAdded,onReviewUpdated, deleteReview}: ReviewsProps) => {
    const [contentError, setContentError] = useState<boolean>(false);
    const [ratingError, setRatingError] = useState<boolean>(false);
    const [formKey, setFormKey] = useState<number>(0);
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);
    const [reviewInEdit, setReviewInEdit] = useState<ReviewInterface | null>(null);

    const token = localStorage.token;

    useEffect(() => {
        Modal.setAppElement('#root');
    },[]);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '50%',
            backgroundColor: '#242424'
        },
    };


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
                    };
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

    const editReviewApiHandler = (e: React.FormEvent<HTMLFormElement>, id: number, content: string, rating: string): void => {
        e.preventDefault();

        // Can only edit if current user.
        if (!currentUser) {
            alert('You need to be logged in to leave a review');
            return;
        }

        // To prevent any DB issues, return if there is no beer or review being edited.
        if (!reviewInEdit || !beer) {
            return;
        }

        // Only sent request to API if the content or rating has been changed.
        if (            
            content !== reviewInEdit.content || 
            rating !== reviewInEdit.rating.toString()
        ) {
            fetch(`${API_URL}/reviews/${id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    accepts: 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({ 
                    content,
                    rating
                })
            })
            .then(res => res.json())
            .then((data) => {
                const review: ReviewInterface = {
                    review_id: data.id,
                    content: data.content,
                    user: data.user.user_name,
                    rating: data.rating,
                    user_image: data.user.user_image,
                    user_id: data.user.user_id,
                    beer: data.beer.beer_name,
                    beer_img: data.beer.beer_image
                };
                onReviewUpdated(review);
                setFormKey(prev => prev + 1);
            })
        } else {
            // Else update form key to clear and close modal and return.
            setFormKey(prev => prev + 1);
            return;
        }

    };

    const deleteReviewHandler = (e: React.MouseEvent<HTMLDivElement>, id: number): void => {
        deleteReview(e, id)
    };

    const editReviewHandler = (review: ReviewInterface): void => {
        setReviewInEdit(review);
        setIsOpen(true);
    };

    const closeModalHandler = (): void => {
        setIsOpen(false);
        if (reviewInEdit) {
            setReviewInEdit(null);
        }
    };

    return (
        <div className='px-2.5'>
            <div className='flex items-center mb-[15px]'>
                <div className='text-3xl font-bold text-center ml-[35%] '>Reviews</div>
                <div className='ml-auto cursor-pointer' onClick={() => setIsOpen(true)}>Leave a Review</div>
            </div>
            <div className='flex flex-col p-4 gap-6 h-[250px] max-h-[250px] overflow-y-scroll border-2 border-white rounded-md'>
                {beer && beer.reviews.length > 0 ?
                    beer.reviews.map((review, index) => (
                        <ReviewCard 
                            review={review} 
                            key={index} 
                            currentUser={currentUser}
                            deleteReview={deleteReviewHandler}
                            editReview={editReviewHandler}
                        />
                    ))
                :
                'No Reviews Yet!'    
                }
            </div>
            <Modal isOpen={modalIsOpen} style={customStyles} overlayClassName="Overlay">
                <div onClick={closeModalHandler}>X</div>
                <AddReview
                    key={formKey} 
                    contentError={contentError}
                    ratingError={ratingError}
                    submitReviewForm={submitReviewHandler}
                    submitEditReviewForm={editReviewApiHandler}
                    currentUser={currentUser}
                    reviewInEdit={reviewInEdit}
                />
            </Modal>
        </div>
    )
};

export default Reviews;