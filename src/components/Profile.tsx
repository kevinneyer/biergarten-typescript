import { NavLink } from 'react-router';
import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import UserForm from './UserForm';

interface ProfileProps {
    currentUser: UserInterface | null;
    profileUser: UserInterface | null;
    deleteReview: (e: React.MouseEvent<HTMLDivElement>, id: number) => void;
    createFollowHandler: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => void;
    deleteFollowHandler: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    isFollowing: boolean;
}
interface FavoriteInterface {
    beer: string;
    beer_id: number;
    brewery: string;
    favorite_id: number;
    image: string;
}

const Profile = ({profileUser, currentUser, deleteReview, createFollowHandler, deleteFollowHandler, isFollowing}: ProfileProps) => {
    const hasReviews = profileUser?.reviews?.length > 0;
    const hasDesiredBeers = profileUser?.favorites?.length > 0;
    const isMe = profileUser?.id == currentUser?.id;
    const [editProfileOpen, setEditProfileOpen] = useState<boolean>(false);

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

    useEffect(() => {
        Modal.setAppElement('#root');
    },[]);
        
    const deleteReviewHandler = (e: React.MouseEvent<HTMLDivElement>, id: number): void => {
        deleteReview(e, id)
    };

    const createFollow = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
        createFollowHandler(e, id);
    };

    const deleteFollow = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        deleteFollowHandler(e);
    };

    const openEditProfileHandler = (e: React.MouseEvent<HTMLDivElement>,) => {
        console.log(e);
        setEditProfileOpen(true);
    };

    return (
        <div className='p-8'>
            {profileUser ?
            <div>
                <div className='grid grid-cols-3 gap-5'>
                    <div className='flex flex-col items-start gap-4'>
                        <img className='min-w-[200px] max-w-[200px] object-contain' src={profileUser.image} />
                        <div>{profileUser.username}</div>
                        {isMe ? 
                            <div 
                                className='p-2 px-4 -mt-2.5 bg-black text-white rounded-md hover:bg-gray-700 cursor-pointer transition-all ease-in-out'
                                onClick={(e) => openEditProfileHandler(e)}
                            >
                                Edit Profile
                            </div>
                        : null}
                        <div className='flex flex-col items-start'>
                            <div>
                                Following: {profileUser.followeds?.length}
                            </div>
                            <div>
                                Followers: {profileUser.followers?.length}
                            </div>
                        </div>
                        {!isMe ?
                            <div>
                                {isFollowing ?
                                <button 
                                    className='bg-red-700 p-2 rounded-sm w-[100px] cursor-pointer hover:bg-red-900 transition-all ease-in-out' 
                                    type="button"
                                    onClick={(e) => deleteFollow(e)}
                                >
                                    Unfollow
                                </button>
                                :
                                <button 
                                    className='bg-green-700 p-2 rounded-sm w-[100px] cursor-pointer hover:bg-green-900 transition-all ease-in-out' 
                                    type="button"
                                    onClick={(e) => createFollow(e, profileUser.id)}
                                >
                                    Follow
                                </button>
                                }
                            </div>
                            :
                            null
                        }
                    </div>
                    <div>
                        <div className='text-2xl font-bold'>Reviews</div>
                        <div className='mt-4'>
                            {!hasReviews ?
                                'No Reviews Yet!'
                            :
                                profileUser.reviews.map((review: ReviewInterface) => (
                                    <div  key={review.review_id} className='bg-white flex gap-2 items-start text-black p-4 min-h-[125px] rounded-lg shadow-sm shadow-white mt-2'>
                                        <div>
                                            <img className='w-24 object-contain' src={review.beer_img} />
                                        </div>
                                        <div className='flex flex-col items-start'>
                                            <div className='font-bold'>{review.beer}</div>
                                            <div className='text-balance text-left'>{review.content}</div>
                                            <div>{review.rating} / 5 stars</div>
                                            {review.user_id == currentUser?.id ?
                                                <div 
                                                    className='p-2 bg-black text-white rounded-md mt-2 hover:bg-red-700 hover:text-black cursor-pointer transition-all ease-in-out'
                                                    onClick={(e) => deleteReviewHandler(e, review.review_id)}
                                                >
                                                    Delete Review
                                                </div>
                                            : null}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div>
                        <div>
                            <div className='text-2xl font-bold'>Desired Beers</div>
                            <div className='mt-4'>
                                {!hasDesiredBeers ? 
                                    'Nothing to see here!'
                                    :
                                    profileUser.favorites.map((favorite: FavoriteInterface) => (
                                        <NavLink 
                                            to={`/beers/${favorite.beer_id}`}
                                        >
                                            <div 
                                                key={favorite.favorite_id} 
                                                className='bg-white flex gap-2 items-start text-black p-4 max-h-[125px] min-h-[125px] rounded-lg shadow-sm shadow-white mt-2'
                                            >
                                                <div>
                                                    <img className='w-20 h-20 object-contain' src={favorite.image} />
                                                </div>
                                                <div className='flex flex-col items-start'>
                                                    <div className='font-bold'>{favorite.beer}</div>
                                                    <div className='text-balance text-left'>by {favorite.brewery}</div>
                                                </div>
                                            </div>
                                        </NavLink>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <Modal 
                    isOpen={editProfileOpen} 
                    style={customStyles} 
                    overlayClassName="Overlay"
                >
                    <div 
                        className='cursor-pointer font-bold text-xl' 
                        onClick={() => setEditProfileOpen(false)}
                    >X</div>
                    <UserForm 
                        currentUser={currentUser}
                        isEditProfile={true}
                    />
                </Modal>
            </div>
            :
            null} 
        </div>
    )
};

export default Profile;