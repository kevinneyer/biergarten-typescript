import { NavLink } from 'react-router';

interface UserCardProps {
    user: UserInterface;
}
const UserCard = ({user}: UserCardProps) => {
    return (
        <>
            <div className='bg-white flex flex-col text-black p-4 max-h-[400px] min-h-[400px] rounded-lg shadow-sm shadow-white'>
                <div className='mt-auto'>
                    <img className='h-48 w-96 object-contain' src={user.image} />
                    <div>{user.username}</div>
                </div>
                <div className='mt-auto'>
                    <button 
                        className='bg-blue-200 p-2 rounded-sm' 
                        type="button"
                    >
                        <NavLink
                            to={`/users/${user.id}`}
                            className={({ isActive }) =>
                                isActive ? "text-red-500" : "text-black"
                            }
                            >
                            See Profile
                        </NavLink>
                    </button>
                </div>
            </div>
        </>
    )
};

export default UserCard;