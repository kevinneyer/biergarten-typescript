import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import Profile from '../components/Profile';
interface ProfileContainerProps {
    currentUser: UserInterface | null;
}

const ProfileContainer = ({currentUser}: ProfileContainerProps) => {
    const { userId } = useParams();
    const [fetchedUser, setFetchedUser] = useState<UserInterface | null>(null)

    // Since this component is shared between 2 routes, only fetch if a userId is present.
    useEffect(() => {
        if (userId) {
            fetch(`http://localhost:3000/api/v1/users/${userId}`)
                // This will need some kind of error assessment for ids that don't exist.
                .then((res) => res.json())
                .then(data => {
                    setFetchedUser(data);
                })
        }
    }, [userId])

    // If userId, use fetchedUser, otherwise default to currentUser.
    // Could be potentially be problematic if no logged in and userId does not exist.
    const profileUser = userId ? fetchedUser : currentUser;

    return (
        <div>
            <Profile currentUser={currentUser} profileUser={profileUser} />
        </div>
    )
};

export default ProfileContainer;