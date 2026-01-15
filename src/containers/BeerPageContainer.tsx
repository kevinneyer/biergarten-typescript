import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import Reviews from '../components/Reviews';
import BeerInfo from '../components/BeerInfo';
import { API_URL } from '../config.ts';

interface BeerPageContainerProps {
    currentUser: UserInterface | null;
}

const BeerPageContainer = ({currentUser}: BeerPageContainerProps) => {
    const { beerId } = useParams();
    const [showBeer, setShowBeer] = useState<BeerInterface | null>(null);
    const [beerIsLiked, setBeerIsLiked] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.token;
        fetch(`${API_URL}/beers/${beerId}`, {
            headers: {
                "Authorization": token
            }
        })
        .then(res => res.json())
        .then(data => {
            setShowBeer(data.beer);
            setBeerIsLiked(data.is_liked);
        })
    }, [beerId]);

    const handleReviewAdded = (newReview: ReviewInterface): void => {
        if (showBeer) {
            setShowBeer({
                ...showBeer,
                reviews: [...showBeer.reviews, newReview]
            });
        }
    };

    const handleReviewDeleted = (reviewId: number): void => {
        if (showBeer) {
            setShowBeer({
                ...showBeer,
                reviews: showBeer.reviews.filter(review => review.review_id !== reviewId)
            });
        }
    };

    return (
        <div className='px-[50px]'>
            <div>
                {showBeer ? 
                <div className='pt-10 grid grid-cols-2 gap-8'>
                    <BeerInfo beer={showBeer} isLiked={beerIsLiked} currentUser={currentUser}/> 
                    <Reviews 
                        beer={showBeer} 
                        currentUser={currentUser} 
                        onReviewAdded={handleReviewAdded}
                        onReviewDeleted={handleReviewDeleted}
                    />
                </div>
                :
                'Loading...'
                }
            </div>
        </div>
    )
};

export default BeerPageContainer;