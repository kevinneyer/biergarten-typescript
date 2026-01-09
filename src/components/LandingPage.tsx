import { NavLink } from 'react-router';

interface LandingPageProps {
    currentUser: UserInterface | null;
    userFetchComplete: boolean;
}

const LandingPage = ({currentUser, userFetchComplete}: LandingPageProps) => {
    return (
        <>
            <div>
                <img className='w-full' src={`src/assets/BIERGARTEN.png`} />
            </div>
            {userFetchComplete ?
                currentUser ? 
                    <div className='flex flex-col items-center mt-[50px]'>
                        Welcome Back {currentUser.username}. Let's get started!
                    </div>
                :
                    <div className='flex flex-col items-center mt-[50px]'>
                        Welcome! Please login to get started.
                        <NavLink className='bg-black w-1/3 p-2 rounded-sm mt-[15px]' to={`/login`}>
                            Login
                        </NavLink>
                    </div>
            :
            null}
        </>
    )
};

export default LandingPage;