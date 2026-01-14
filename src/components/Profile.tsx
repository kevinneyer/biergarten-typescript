interface ProfileProps {
    currentUser: UserInterface | null;
    profileUser: UserInterface | null;
}
interface FavoriteInterface {
    beer: string;
    beer_id: number;
    brewery: string;
    favorite_id: number;
    image: string;
}

const Profile = ({profileUser}: ProfileProps) => {
    const hasReviews = profileUser?.reviews?.length > 0;
    const hasDesiredBeers = profileUser?.favorites?.length > 0;

    return (
        <div className='p-8'>
            {profileUser ?
                <div className='grid grid-cols-3 gap-5'>
                    <div className='flex flex-col items-start gap-4'>
                        <img className='min-w-[200px] max-w-[200px] object-contain' src={profileUser.image} />
                        <div>{profileUser.username}</div>
                        <div className='flex flex-col items-start'>
                            <div>
                                Following: {profileUser.followeds?.length}
                            </div>
                            <div>
                                Followers: {profileUser.followers?.length}
                            </div>
                        </div>
                    </div>
                    <div>
                        Reviews
                        <div className='mt-4'>
                            {!hasReviews ?
                                'No Reviews Yet!'
                            :
                                profileUser.reviews.map((review: ReviewInterface) => (
                                    <div className='bg-white flex gap-2 items-start text-black p-4 min-h-[125px] rounded-lg shadow-sm shadow-white mt-2'>
                                        <div>
                                            <img className='w-24 object-contain' src={review.beer_img} />
                                        </div>
                                        <div className='flex flex-col items-start'>
                                            <div className='font-bold'>{review.beer}</div>
                                            <div className='text-balance text-left'>{review.content}</div>
                                            <div>{review.rating} / 5 stars</div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div>
                        <div>
                            Desired Beers
                            <div className='mt-4'>
                                {!hasDesiredBeers ? 
                                    'Nothing to see here!'
                                    :
                                    profileUser.favorites.map((favorite: FavoriteInterface) => (
                                        <div className='bg-white flex gap-2 items-start text-black p-4 max-h-[125px] min-h-[125px] rounded-lg shadow-sm shadow-white mt-2'>
                                        <div>
                                            <img className='w-20 h-20 object-contain' src={favorite.image} />
                                        </div>
                                        <div className='flex flex-col items-start'>
                                            <div className='font-bold'>{favorite.beer}</div>
                                            <div className='text-balance text-left'>by {favorite.brewery}</div>
                                        </div>
                                    </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            :
            null} 
        </div>
    )
};

export default Profile;