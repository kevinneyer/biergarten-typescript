interface ProfileProps {
    currentUser: UserInterface | null;
    profileUser: UserInterface | null;
}

const Profile = ({profileUser}: ProfileProps) => {
    return (
        <div>
        <div className='p-8'>
            {profileUser ?
                <div className='flex flex-col items-start gap-4'>
                    <img className='min-w-[200px] max-w-[200px]' src={profileUser.image} />
                    <div>{profileUser.username}</div>
                    <div className='flex flex-col items-start'>
                        <div>
                            Following: {profileUser.followeds.length}
                        </div>
                        <div>
                            Followers: {profileUser.followers.length}
                        </div>
                    </div>
                </div>
            :
            null} 
        </div>
        </div>
    )
};

export default Profile;