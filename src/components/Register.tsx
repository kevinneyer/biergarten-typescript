import { useState } from 'react';
import { API_URL } from '../config.ts';
import { useNavigate } from 'react-router';
// import { ClipLoader } from 'react-spinners';
import UserForm from './UserForm.tsx';

interface RegisterProps {
    setUser: (user: LoginResponseInterface) => void;
}

// interface ErrorInterface {
//     usernameError: boolean;
//     passwordError: boolean;
//     passwordMatch: boolean;
//     emailError: boolean;
//     image: boolean;
// }

const Register = ({setUser}: RegisterProps) => {
    // const [username, setUsername] = useState<string | null>(null);
    // const [password, setPassword] = useState<string | null>(null);
    // const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
    // const [email, setEmail] = useState<string | null>(null);
    // const [image, setImage] = useState<string | null>(null);
    // const [showPassword, setShowPassword] = useState<boolean>(false);
    // const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    // const [formErrors, setFormErrors] = useState<ErrorInterface>({
    //     usernameError: false,
    //     passwordError: false,
    //     passwordMatch: false,
    //     emailError: false,
    //     image: false,
    // });
    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    const navigate = useNavigate();

    // const handleUsername = (e: React.ChangeEvent<HTMLInputElement>): void => {
    //     setUsername(e.target.value)
    // }

    // const handleEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    //     setEmail(e.target.value)
    // }

    // const handlePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    //     setPassword(e.target.value)
    // }
    
    // const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    //     setConfirmPassword(e.target.value)
    // }
    
    // const handleImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    //     setImage(e.target.value)
    // }

    // const passwordVisibleHandler = (): void => {
    //     setShowPassword(!showPassword);
    // };

    // const confirmPasswordVisibleHandler = (): void => {
    //     setShowConfirmPassword(!showConfirmPassword);
    // };

    const createAccountHandler = (username: string, email: string, password: string | null, image: string): void => {
        
        // const newErrors: ErrorInterface = {
        //     usernameError: !username || username.length === 0,
        //     passwordError: !password || password.length === 0,
        //     passwordMatch: password !== confirmPassword,
        //     emailError: !email || email.length === 0,
        //     image: false,
        // };

        // setFormErrors(newErrors);
        
        // const hasErrors = Object.values(newErrors).some(value => value === true);
        
        // if (hasErrors) {
        //     return;
        // }

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
            // Maybe set some spinner here until data is set, then navigate.
            navigate('/profile');
            setShowSpinner(false);
        });
    };

    return (
        //  <div className='flex flex-col items-center'>
        //     <div className='bg-black rounded-md w-[600px] p-5 text-white'>
        //         <div className='flex flex-col items-center'>
        //             <span className='text-[16px] font-bold'>Create Account</span>
        //             <form className='w-[300px] flex flex-col gap-4 mt-5' onSubmit={(e) => createAccountHandler(e)}>
        //                 <div className='text-black flex flex-col gap-6'>
        //                     <div>
        //                         <input 
        //                             className='bg-white p-[5px] w-full' 
        //                             type='text' 
        //                             placeholder='Enter Username...' 
        //                             onChange={handleUsername} 
        //                         />
        //                         {formErrors.usernameError ?
        //                             <p className='text-red-600 text-[12px] text-left'>Username cannot be empty</p>
        //                             :
        //                             null
        //                         }
        //                     </div>
        //                     <div>
        //                         <input 
        //                             className='bg-white p-[5px] w-full' 
        //                             type='email' 
        //                             placeholder='Enter Email...' 
        //                             onChange={handleEmail} 
        //                         />
        //                         {formErrors.emailError ? 
        //                             <p className='text-red-600 text-[12px] text-left'>Email cannot be empty</p>
        //                             :
        //                             null
        //                         }
        //                     </div>
        //                     <div>
        //                         <div className='flex items-center'>
        //                             <input className='bg-white p-[5px] w-full' type={showPassword ? 'text' : 'password'} placeholder='Enter Password...' onChange={handlePassword} />
        //                             <span className='text-white w-[5px] pl-[5px] cursor-pointer' onClick={passwordVisibleHandler}>{showPassword ? 'Hide' : 'Show'}</span>
        //                         </div>
        //                         {formErrors.passwordError ? 
        //                             <p className='text-red-600 text-[12px] text-left'>Password cannot be empty</p>
        //                             :
        //                             null
        //                         }
        //                     </div>
        //                     <div>
        //                         <div className='flex items-center'>
        //                             <input className='bg-white p-[5px] w-full' type={showConfirmPassword ? 'text' : 'password'} placeholder='Confirm Password...' onChange={handleConfirmPassword} />
        //                             <span className='text-white w-[5px] pl-[5px] cursor-pointer' onClick={confirmPasswordVisibleHandler}>{showConfirmPassword ? 'Hide' : 'Show'}</span>
        //                         </div>
        //                         {formErrors.passwordMatch ? 
        //                             <p className='text-red-600 text-[12px] text-left'>Passwords don't match</p>
        //                             :
        //                             null
        //                         }
        //                     </div>
        //                     <input className='bg-white p-[5px]' type='text' placeholder='Enter Image...' onChange={handleImage} />
        //                 </div>
        //                 <input className='bg-gray-100 hover:bg-gray-400 cursor-pointer transition-all ease-in-out text-black p-[5px] rounded-md' type='submit'></input>
        //             </form>
        //         </div>
        //         <ClipLoader
        //             loading={showSpinner}
        //             color='#fff'
        //             size={150}
        //             aria-label="Loading Spinner"
        //             data-testid="loader"
        //         />
        //     </div>
        // </div>
        <>
            <UserForm 
                createAccountHandler={createAccountHandler}
                showSpinner={showSpinner}
            />
            {/* <ClipLoader
                loading={showSpinner}
                color='#fff'
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />  */}
        </>
    );
};

export default Register;