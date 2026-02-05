import { useState } from 'react';
import { API_URL } from '../config.ts';
import { useNavigate } from 'react-router';

interface RegisterProps {
    setUser: (user: LoginResponseInterface) => void;
}
const Register = ({setUser}: RegisterProps) => {
    const [username, setUsername] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleUsername = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUsername(e.target.value)
    }

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value)
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value)
    }
    
    const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setConfirmPassword(e.target.value)
    }
    
    const handleImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setImage(e.target.value)
    }

    const passwordVisibleHandler = (): void => {
        setShowPassword(!showPassword);
    };

    const confirmPasswordVisibleHandler = (): void => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const createAccountHandler = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        
        // @TODO Needs error handling for empty/incorrect form fields.
        if (password === confirmPassword) {
            fetch(`${API_URL}/signup`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    accept: 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                    image: image
                })
            })
            .then(res => res.json())
            .then((data) => {
                if (data.errors) {
                    alert(data.errors);
                    return;
                }

                setUser(data);
                // Maybe set some spinner here until data is set, then navigate.
                navigate('/profile');
            });
        } else {
            alert('Passwords do not match.');
        }
    };

    return (
         <div className='flex flex-col items-center'>
            <div className='bg-black rounded-md w-[600px] p-5 text-white'>
                <div className='flex flex-col items-center'>
                    <span className='text-[16px] font-bold'>Create Account</span>
                    <form className='w-[300px] flex flex-col gap-4 mt-5' onSubmit={(e) => createAccountHandler(e)}>
                        <div className='text-black flex flex-col gap-6'>
                            <input className='bg-white p-[5px]' type='text' placeholder='Enter Username...' onChange={handleUsername} />
                            <input className='bg-white p-[5px]' type='email' placeholder='Enter Email...' onChange={handleEmail} />
                            <div className='flex items-center'>
                                <input className='bg-white p-[5px] w-full' type={showPassword ? 'text' : 'password'} placeholder='Enter Password...' onChange={handlePassword} />
                                <span className='text-white w-[5px] pl-[5px] cursor-pointer' onClick={passwordVisibleHandler}>{showPassword ? 'Hide' : 'Show'}</span>
                            </div>
                            <div className='flex items-center'>
                                <input className='bg-white p-[5px] w-full' type={showConfirmPassword ? 'text' : 'password'} placeholder='Confirm Password...' onChange={handleConfirmPassword} />
                                <span className='text-white w-[5px] pl-[5px] cursor-pointer' onClick={confirmPasswordVisibleHandler}>{showConfirmPassword ? 'Hide' : 'Show'}</span>
                            </div>
                            <input className='bg-white p-[5px]' type='text' placeholder='Enter Image...' onChange={handleImage} />
                        </div>
                        <input className='bg-gray-100 hover:bg-gray-400 cursor-pointer transition-all ease-in-out text-black p-[5px] rounded-md' type='submit'></input>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;