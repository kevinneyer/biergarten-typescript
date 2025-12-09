import { NavLink } from "react-router";

interface LandingPageProps {
    currentUser: UserInterface | null;
}

const LandingPage = ({currentUser}: LandingPageProps) => {
    return (
        <>
        <div>
            <img className='w-full' src={`src/assets/BIERGARTEN.png`} />
        </div>
        {
            currentUser ? 
            <div>
                Welcome Back {currentUser.username}. Let's get started!
                <NavLink className='bg-black w-1/3 p-2 rounded-sm mt-[15px]' to={`/profile`}>
                    This will go to beers or profile?
                </NavLink>
            </div>
            :
            <div className="flex flex-col items-center mt-[50px]">
                Welcome! Please login to get started.
                <NavLink className='bg-black w-1/3 p-2 rounded-sm mt-[15px]' to={`/login`}>
                    Login
                </NavLink>
            </div>
        }
        </>
    )
};

export default LandingPage;