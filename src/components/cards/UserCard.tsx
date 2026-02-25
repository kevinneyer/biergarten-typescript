import { NavLink } from 'react-router';

interface UserCardProps {
    user: UserInterface;
}
const UserCard = ({user}: UserCardProps) => {
    const followers = user.followers.length;
    const following = user.followeds.length

    return (
        <>
            <div className='bg-white flex flex-col text-black p-4 w-[304px] max-h-[400px] min-h-[400px] rounded-lg shadow-sm shadow-white'>
                <div className='mt-auto'>
                    <img className='h-48 w-96 object-contain' src={user.image} />
                    <div className='text-[18px] font-semibold mt-[5px]'>{user.username}</div>
                </div>
                <div className='text-sm'>
                    <span>Following: {following}</span>
                    <span className='ml-[5px]'>Followers: {followers}</span>
                </div>
                <div className='mt-auto'>
                    <button 
                        className='bg-transparent text-black p-2 border-2 border-black rounded-md  hover:bg-black hover:text-white transition-all ease-in-out cursor-pointer' 
                        type="button"
                    >
                        <NavLink to={`/users/${user.id}`}>
                            See Profile
                        </NavLink>
                    </button>
                </div>
            </div>
        </>
    )
};

export default UserCard;