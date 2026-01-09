import ProfileUserInfo from '../components/ProfileUserInfo';
interface ProfileContainerProps {
    currentUser: UserInterface | null;
}

const ProfileContainer = ({currentUser}: ProfileContainerProps) => {
    return (
        <div>
            {currentUser ? currentUser.username + "'s" + ' Profile' : null}
            <ProfileUserInfo />
        </div>
    )
};

export default ProfileContainer;