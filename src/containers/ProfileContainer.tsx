import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import Profile from '../components/Profile';
import { API_URL } from '../config.ts';
interface ProfileContainerProps {
    currentUser: UserInterface | null;
    updateCurrentUser: (updatedUser: UserInterface) => void;
}

interface Followed {
    followed_id: number;
    username: string;
    image: string;
}
interface Relationship {
    followed: Followed;
    id: number;
}

const ProfileContainer = ({currentUser, updateCurrentUser}: ProfileContainerProps) => {
    const { userId } = useParams();
    const [fetchedUser, setFetchedUser] = useState<UserInterface | null>(null);
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const [followId, setFollowId] = useState<number | null>(null);

    const token = localStorage.token;

    // Since this component is shared between 2 routes, only fetch if a userId is present.
    useEffect(() => {
        if (userId) {
            fetch(`${API_URL}/users/${userId}`)
                // This will need some kind of error assessment for ids that don't exist.
                .then((res) => res.json())
                .then(data => {
                    setFetchedUser(data);
                    const follow = currentUser?.active_relationships.filter((relationship: Relationship) => relationship.followed?.followed_id == data.id);
                    if (follow && follow.length > 0) {
                        setIsFollowing(true);
                        setFollowId(follow[0].id);
                    }
                })
        }
    }, [userId, currentUser, token]);

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

    const createFollowHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number): void => {
        e.preventDefault();

        if (currentUser) {
            fetch(`${API_URL}/relationships`, {
                method: 'POST',
                headers:{
                    'content-type': 'application/json',
                    accept: 'application/json',
                    "Authorization": token,
                },
                body: JSON.stringify({ followed_id: id, follower_id: currentUser.id})
            })
            .then(res => res.json())
            .then((data) => {
                setIsFollowing(true);
                setFollowId(data.id);
                updateCurrentUser({
                    ...currentUser,
                    followeds: [...currentUser.active_relationships, data]
                });
            })
        }
    };

    const deleteFollowHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if (currentUser) {
            if (followId) {
                fetch(`${API_URL}/relationships/${followId}`, {
                    method: 'DELETE',
                    headers:{
                        'content-type': 'application/json',
                        accept: 'application/json',
                        "Authorization": token,
                    },
                })
                .then((res) => {
                    if (!res.ok) {
                        alert('Something Went Wrong!');
                        return;
                    }
                    
                    setIsFollowing(false);
                    setFollowId(null);
                    updateCurrentUser({
                        ...currentUser,
                        followeds: currentUser.active_relationships?.filter((relationship: Relationship) => relationship.id !== followId)
                    });

                })
            } else {
                alert('Something Went Wrong!');
            }
        } else {
            alert('You Must Be Logged In');
        }
    };

     return (
        <div>
            <Profile 
                currentUser={currentUser} 
                profileUser={profileUser}
                deleteReview={deleteReviewApiHandler}
                createFollowHandler={createFollowHandler}
                deleteFollowHandler={deleteFollowHandler}
                isFollowing={isFollowing}
            />
        </div>
    )
};

export default ProfileContainer;