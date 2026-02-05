import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { API_URL } from '../config.ts';
import { NavLink } from 'react-router';
interface LoginProps {
    setUser: (user: LoginResponseInterface) => void;
}

const Login = ({ setUser }: LoginProps) => {
    const [username, setUsername] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value);
    };
    
    const navigate = useNavigate();
    
    const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!username || !password) {
            alert('errors');
            return;
        }

        // This will need some kind of flash error validation if username exists,
        // or any kind of username/password errors.
        fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                accept: 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            setUser(data);
            navigate('/profile');
        });
    };

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
                <div className='mt-[25px] text-[14px]'>
                    Need an account?  <NavLink className='font-bold cursor-pointer underline' to={'/register'}>Register</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Login;