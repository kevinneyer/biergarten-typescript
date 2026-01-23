import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import Profile from '../components/Profile';
import { API_URL } from '../config.ts';
interface ProfileContainerProps {
    currentUser: UserInterface | null;
    updateCurrentUser: (updatedUser: UserInterface) => void;
}

const ProfileContainer = ({currentUser, updateCurrentUser}: ProfileContainerProps) => {
    const { userId } = useParams();
    const [fetchedUser, setFetchedUser] = useState<UserInterface | null>(null);

    // Since this component is shared between 2 routes, only fetch if a userId is present.
    useEffect(() => {
        if (userId) {
            fetch(`${API_URL}/${userId}`)
                // This will need some kind of error assessment for ids that don't exist.
                .then((res) => res.json())
                .then(data => {
                    setFetchedUser(data);
                })
        }
    }, [userId, currentUser])

    // If userId, use fetchedUser, otherwise default to currentUser.
    // Could be potentially be problematic if no logged in and userId does not exist.
    const profileUser = userId ? fetchedUser : currentUser;

    const deleteReviewApiHandler = (e: React.MouseEvent<HTMLDivElement>, id: number): void => {
        e.preventDefault();

        if (currentUser?.id == profileUser?.id) {
            fetch(`${API_URL}/reviews/${id}`, {
                method: 'DELETE',
                headers:{
                    'content-type': 'application/json'
                }
            })
            .then((res) => {
                if (res.ok) {
                    handleReviewDeleted(id); 
                }
            });
        }
    };

    const handleReviewDeleted = (id: number): void => {
        if (currentUser && currentUser.id === profileUser?.id) {
            updateCurrentUser({
                ...currentUser,
                reviews: currentUser.reviews?.filter((review: ReviewInterface) => review.review_id !== id)
            });
        }
    };

    return (
        <div>
            <Profile 
                currentUser={currentUser} 
                profileUser={profileUser}
                deleteReview={deleteReviewApiHandler}
            />
        </div>
    )
};

export default ProfileContainer;