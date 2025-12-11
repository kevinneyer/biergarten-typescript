interface ProfileContainerProps {
    currentUser: UserInterface | null;
}

const ProfileContainer = ({currentUser}: ProfileContainerProps) => {
    return (
        <div>
            {currentUser ? currentUser.username + "'s" + ' Profile' : null}
        </div>
    )
};

export default ProfileContainer;