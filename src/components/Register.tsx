import { useState } from 'react';
import { API_URL } from '../config.ts';
import { useNavigate } from 'react-router';
import UserForm from './UserForm.tsx';

interface RegisterProps {
    setUser: (user: LoginResponseInterface) => void;
}

const Register = ({setUser}: RegisterProps) => {
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const navigate = useNavigate();

    const createAccountHandler = (username: string, email: string, password: string | null, image: string): void => {
        setShowSpinner(true);
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
                setShowSpinner(false);
                alert(data.errors);
                return;
            }

            setUser(data);
            navigate('/profile');
            setShowSpinner(false);
        });
    };

    return (
        <>
            <UserForm 
                createAccountHandler={createAccountHandler}
                showSpinner={showSpinner}
            />
        </>
    );
};

export default Register;