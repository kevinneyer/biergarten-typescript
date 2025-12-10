import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router";

interface LoginProps {
    setUser: (user: LoginResponseInterface) => void;
    currentUser: UserInterface | null;
}

const Login = ({ setUser, currentUser }: LoginProps) => {
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
        fetch('http://localhost:3000/api/v1/login', {
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
            navigate('/profile')
        })
    };

    return (
        <div className="flex flex-col items-center">
            { currentUser?.username ?? 'Please Login' }
            <form className="w-[600px] flex flex-col gap-4 mt-5" onSubmit={loginHandler}>
                <div className='text-black flex flex-col gap-6'>
                    <input className='bg-white' type="text" placeholder="Enter Username..." onChange={handleUsernameChange} />
                    <input className='bg-white' type="text" placeholder="Enter Password..." onChange={handlePasswordChange} />
                </div>
                <input type="submit"></input>
            </form>
        </div>
    )
};

export default Login;