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
                        Welcome back, {currentUser.username}. Let's get started!
                    </div>
                :
                    <div className='flex flex-col items-center mt-[50px]'>
                        Welcome! Please login or sign up to
                        <NavLink className='bg-black w-1/3 p-2 rounded-sm mt-[15px] hover:bg-gray-500 transition-all ease-in-out' to={`/login`}>
                            Get Started
                        </NavLink>
                    </div>
            :
            null}
        </>
    )
};

export default LandingPage;