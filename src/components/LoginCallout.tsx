import { NavLink } from 'react-router';

const LoginCallout = () => {
    return (
        <div className='flex flex-col items-center justify-center'>
            You Must Be Logged In to View This Page
            <button 
                className='bg-blue-900 p-2 rounded-sm mt-5 w-[200px] hover:bg-black transition-all ease-in-out' 
                type="button"
            >
                <NavLink to={`/login`}>
                    Login
                </NavLink>
            </button>
        </div>
    )
};

export default LoginCallout;