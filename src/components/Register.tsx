import { useState } from 'react';

interface RegisterProps {
    setUser: (user: LoginResponseInterface) => void;
}
const Register = ({setUser}: RegisterProps) => {
    const [username, setUsername] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [image, setImage] = useState<string | null>(null);

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }
    
    const handleImage = (e) => {
        setImage(e.target.value)
    }
    return (
         <div className='flex flex-col items-center'>
            <div className='bg-black rounded-md w-[600px] h-[300px] p-5 text-white'>
                <div className='flex flex-col items-center'>
                    <span className='text-[16px] font-bold'>Please Login</span>
                    <form className='w-[300px] flex flex-col gap-4 mt-5' onSubmit={loginHandler}>
                        <div className='text-black flex flex-col gap-6'>
                            <input className='bg-white p-[5px]' type='text' placeholder='Enter Username...' onChange={handleUsernameChange} />
                            <input className='bg-white p-[5px]' type='text' placeholder='Enter Password...' onChange={handlePasswordChange} />
                        </div>
                        <input className='bg-gray-100 hover:bg-gray-400 cursor-pointer transition-all ease-in-out text-black p-[5px] rounded-md' type='submit'></input>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;